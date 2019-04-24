const fastify = require('fastify')({
    logger: true
});

class Product {
    constructor(id = null, name = null){
        this.id = id;
        this.name = name;
    }
}

class ProductList {
    constructor(){
        let list = new Array();
        list.push(new Product(1, 'Teste 1'));
        list.push(new Product(2, 'Teste 2'));
        this.list = list;
    }
}

fastify.get('/product', (req, res) => {
    let products = new ProductList();
    res.send(products);
});

const schema = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' }
        }
    }
};

// fastify.get('/product/:id', (req, res) => {
fastify.get('/product/:id', {schema}, (req, res) => {
    let products = new ProductList();
    let product = products.list.filter(p => p.id === req.params.id);
    res
        .header('X-API', true)
        .send(product);
});

fastify.get('/webview', {schema}, (req, res) => {
    res.type('text/html').send("<strong>asd</strong>");
    // res.send("<strong>asd</strong>");
});

fastify.listen(3000, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info(`server listening on ${address}`);
});