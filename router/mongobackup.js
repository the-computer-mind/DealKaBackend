const { MongoTransferer, MongoDBDuplexConnector } = require('mongodb-snapshot');

async function copyMongo2Mongo() {
    const mongo_connector_1 = new MongoDBDuplexConnector({
        connection: {
            uri: `mongodb+srv://shofick:96478679shofick@cluster0.2xa7j68.mongodb.net/?retryWrites=true&w=majority`,
            dbname: 'test',
        },
    });

    const mongo_connector_2 = new MongoDBDuplexConnector({
        connection: {
            uri: `mongodb://localhost:27017/thecomputermind?authSource=admin`,
            dbname: 'thecomputermind',
        },
    });

    // const mongo_connector_3 = new MongoDBDuplexConnector({
    //     connection: {
    //         uri: `mongodb://<username>:<password>@<hostname>:<port>`,
    //         dbname: '<database-name>',
    //     },
    // });

    const transferer = new MongoTransferer({
        source: mongo_connector_1,
        targets: [mongo_connector_2],
    });

    for await (const { total, write } of transferer) {
        console.log(`remaining bytes to write: ${total - write}`);
    }
}

// copyMongo2Mongo();


const cron = require('node-cron'), spawn = require('child_process').spawn;

let dbBackupTask = cron.schedule('59 23 * * *', () => {
    let backupProcess = spawn('mongodump', [
        '--db=thecomputermind',
        '--archive=./db/backup/',
        '--gzip'
      ]);

    backupProcess.on('exit', (code, signal) => {
        if(code) 
            console.log('Backup process exited with code ', code);
        else if (signal)
            console.error('Backup process was killed with singal ', signal);
        else 
            console.log('Successfully backedup the database')
    });
});