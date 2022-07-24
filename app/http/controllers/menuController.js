const Menu = require('../../models/menu');

function menuController() {
    return {
        async index(req, res) {
            const pizzas = await Menu.find();
            // console.log(pizzas);
            return res.render('menu', { pizzas: pizzas });
        }
    }
}

module.exports = menuController;