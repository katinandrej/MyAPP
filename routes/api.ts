const express1 = require('express')
const router = express1.Router();

router.get('/', (req, res) => {
    res.send('From API route')
})

module.exports = router