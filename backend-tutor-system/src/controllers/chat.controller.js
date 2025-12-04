const db = require('../config/db');

// 1. Lấy danh sách cuộc trò chuyện (Inbox)
const getConversations = async (req, res) => {
    try {
        const userId = req.user.id;

        // Query này khá phức tạp: Lấy conversation mà user tham gia, kèm theo tin nhắn cuối cùng
        const query = `
            SELECT 
                c.conversation_id, 
                c.is_group_chat, 
                c.group_name,
                -- Lấy tin nhắn cuối cùng
                (SELECT content FROM messages m WHERE m.conversation_id = c.conversation_id ORDER BY created_at DESC LIMIT 1) as last_message,
                (SELECT created_at FROM messages m WHERE m.conversation_id = c.conversation_id ORDER BY created_at DESC LIMIT 1) as last_message_time
            FROM conversations c
            JOIN conversation_participants cp ON c.conversation_id = cp.conversation_id
            WHERE cp.user_id = ?
            ORDER BY last_message_time DESC
        `;

        const [conversations] = await db.query(query, [userId]);

        // Lấy thông tin người chat cùng (nếu là chat 1-1)
        for (const conv of conversations) {
            if (!conv.is_group_chat) {
                const [partner] = await db.query(`
                    SELECT u.full_name, u.user_id 
                    FROM conversation_participants cp
                    JOIN users u ON cp.user_id = u.user_id
                    WHERE cp.conversation_id = ? AND cp.user_id != ?
                `, [conv.conversation_id, userId]);
                
                if (partner.length > 0) {
                    conv.partner_name = partner[0].full_name;
                    conv.partner_id = partner[0].user_id;
                }
            }
        }

        res.json({ success: true, data: conversations });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
};

// 2. Lấy nội dung tin nhắn của 1 cuộc trò chuyện
const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const userId = req.user.id;

        // Kiểm tra xem user có trong cuộc trò chuyện này không (Bảo mật)
        const [check] = await db.query(
            'SELECT * FROM conversation_participants WHERE conversation_id = ? AND user_id = ?',
            [conversationId, userId]
        );
        if (check.length === 0) return res.status(403).json({ message: 'Bạn không có quyền xem cuộc trò chuyện này' });

        // Lấy tin nhắn
        const [messages] = await db.query(`
            SELECT m.*, u.full_name as sender_name 
            FROM messages m
            JOIN users u ON m.sender_id = u.user_id
            WHERE m.conversation_id = ?
            ORDER BY m.created_at ASC
        `, [conversationId]);

        res.json({ success: true, data: messages });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
};

// 3. Gửi tin nhắn
const sendMessage = async (req, res) => {
    try {
        const { conversation_id, content } = req.body; // content là nội dung chat
        const senderId = req.user.id;

        if (!conversation_id || !content) return res.status(400).json({ message: 'Thiếu thông tin' });

        await db.query(
            'INSERT INTO messages (conversation_id, sender_id, content, message_type) VALUES (?, ?, ?, ?)',
            [conversation_id, senderId, content, 'Text']
        );

        res.status(201).json({ success: true, message: 'Gửi tin nhắn thành công' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
};

// 4. Bắt đầu chat với 1 người (Tạo cuộc trò chuyện mới)
const startConversation = async (req, res) => {
    const connection = await db.getConnection();
    try {
        const senderId = req.user.id;
        const { receiver_id } = req.body; // ID của người muốn chat cùng

        // Kiểm tra xem đã có chat 1-1 giữa 2 người này chưa
        // (Query này hơi phức tạp, để đơn giản ta sẽ tạo mới luôn hoặc check logic sau)
        
        await connection.beginTransaction();

        // Tạo conversation mới
        const [convResult] = await connection.query('INSERT INTO conversations (is_group_chat) VALUES (0)');
        const conversationId = convResult.insertId;

        // Thêm 2 người vào cuộc trò chuyện
        await connection.query('INSERT INTO conversation_participants (conversation_id, user_id) VALUES (?, ?)', [conversationId, senderId]);
        await connection.query('INSERT INTO conversation_participants (conversation_id, user_id) VALUES (?, ?)', [conversationId, receiver_id]);

        await connection.commit();

        res.status(201).json({ success: true, message: 'Bắt đầu chat thành công', conversationId });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    } finally {
        connection.release();
    }
};

module.exports = { getConversations, getMessages, sendMessage, startConversation };