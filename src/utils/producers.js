

const amqp = require('amqplib/callback_api');

// Define the connectAndSend function
const connectAndSend = (email) => {
    amqp.connect('amqp://localhost', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }
    
            var queue = 'fundo_Note';
            var msg = `You logged in with this email: ${email} in fundoo app`;
    
            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(msg));
    
            console.log(" Sent %s", msg);
        });
        setTimeout(function() {
            connection.close();
            //process.exit(0);
        }, 500);
    });
}

// Export the connectAndSend function
module.exports = { connectAndSend };

// const amqp = require('amqplib/callback_api');

// const connectAndSend = (email, retryCount = 3) => {
//     amqp.connect('amqp://localhost', function(error0, connection) {
//         if (error0) {
//             console.error('Error connecting to RabbitMQ:', error0.message);
//             if (retryCount > 0) {
//                 console.log(`Retrying connection... Attempts left: ${retryCount}`);
//                 setTimeout(() => {
//                     connectAndSend(email, retryCount - 1);
//                 }, 5000); // Retry after 5 seconds
//                 return;
//             } else {
//                 console.error('Maximum retry attempts reached. Exiting...');
//                 return;
//             }
//         }
//         console.log("hiii");
//         connection.createChannel(function(error1, channel) {
//             if (error1) {
//                 console.error('Error creating channel:', error1.message);
//                 return;
//             }
    
//             var queue = 'fundo';
//             var msg = `You logged in with this email: ${email} in fundoo app`;
    
//             channel.assertQueue(queue, {
//                 durable: false
//             });
//             channel.sendToQueue(queue, Buffer.from(msg));
    
//             console.log(" [x] Sent %s", msg);

//             setTimeout(function() {
//                 connection.close();
//             }, 500);
//         });
//     });
// }

// module.exports = { connectAndSend };
 
