require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env');
    }

    let admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      const hashed = await bcrypt.hash(password, 12);
      admin = await Admin.create({ name: 'Admin', email: email.toLowerCase(), password: hashed });
      console.log('Admin created:', admin.email);
    } else {
      console.log('Admin already exists:', admin.email);
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
})();
