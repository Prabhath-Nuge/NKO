import bcrypt from 'bcrypt';

async function hashPasswordWithGeneratedSalt(plainPassword) {
    try {
      const salt = await bcrypt.genSalt(10);
      
      const hashedPassword = await bcrypt.hash(plainPassword, salt);
      return hashedPassword;
    } catch (error) {
      console.error('Error hashing password:', error);
    }
  }

  export default hashPasswordWithGeneratedSalt;