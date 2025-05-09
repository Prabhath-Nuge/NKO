export const getSession = async (req, res) => {
  try {
    console.log("hi");
    
    const user = await req.session.user;
    if (!user) {
      return res.status(401).json({ error: true, message: 'Session not found' });
    }
    return res.status(200).json({ error: false, data: user });
  } catch (error) {
    console.error('Error fetching session:', error);
    return res.status(500).json({ error: true, message: 'Internal server error' });
  }
}