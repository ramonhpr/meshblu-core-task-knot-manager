var PublishMessage = require('meshblu-core-task-publish-message');

class KnotPublishMessage extends PublishMessage {
  constructor(options={}) {
    super(options);
    this.firehoseClient = options.firehoseClient;
    this.uuidAliasResolver = options.uuidAliasResolver;
    this.datastore = options.datastore;
  }
  do(request, callback) {
    super.do(request, (error, res) => {
      if (error) {
        return;
      } else {
        console.log('entrou');
        console.log(res);
        var message = JSON.parse(request.rawData);
        message.toUuid = request.metadata.toUuid;
        message.messageType = request.metadata.messageType;
        console.log('message');
        console.log(message);
        this.datastore.insert(message, (error) => {
          if (!error) {
            callback(null, res);
            return;
          }
        });
      }
    });
  }
}

module.exports = KnotPublishMessage;
