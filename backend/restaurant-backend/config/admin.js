module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'af92132b809ef9c5a29a8e757a2ea7b0'),
  },
});
