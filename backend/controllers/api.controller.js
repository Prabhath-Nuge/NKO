export const getSession = async (req, res) => {
  try {        
    const user = await req.session.user;
    if (!user) {
      return res.status(401).json({ error: true, message: 'Session not found' });
    }
    
    return res.status(200).json({ error: false, data: user });
  } catch (error) {
    return res.status(500).json({ error: true, message: 'Internal server error' });
  }
}