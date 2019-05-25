const Hapi = require('hapi');
require('env2')('./.env');
const config = require('./config');
const routesHelloHapi = require('./routes');
const hapiAuthJWT2 = require('hapi-auth-jwt2');
const pluginHapiSwagger = require('./plugins/swagger');
const pluginHapiGood = require('./plugins/hapi-good');
const models=require('./models');
const Inert = require('inert');
const server = new Hapi.Server();
// 配置服务器启动host与端口
server.connection({
    port: config.port,
    host: config.host,
    routes: {
        cors: true
    }
});

const init = async () => {
    // 注册插件
    await server.register([
        hapiAuthJWT2,
        ...pluginHapiSwagger,
        pluginHapiGood,
        Inert,
    ]);
    server.route([
        // 创建一个简单的hello hapi接口
        ...routesHelloHapi,
    ]);
    // 启动服务
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

init();

var initDb = function(){
    var sequelize = models.sequelize;
    //Determine if the database connection is successful
    sequelize.sync({force: false}).then(function() {
        console.log("connection successed");
    }).catch(function(err){
        console.log("connection failed due to error: %s", err);
    });
};
initDb();