const router = require('./src/routers').default;

const POST = 3000;
router.listen(POST, () => console.log('App listen on port ' + POST));
