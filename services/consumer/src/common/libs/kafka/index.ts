import { Kafka, SASLOptions } from 'kafkajs';
import configs from '../../environments';
import log from '../log';

const sasl: SASLOptions | undefined =
  configs.kafka.username && configs.kafka.password
    ? {
        username: configs.kafka.username,
        password: configs.kafka.password,
        mechanism: 'plain',
      }
    : undefined;
const ssl = !!sasl;

const kafka = new Kafka({
  clientId: configs.kafka.clientId,
  brokers: configs.kafka.brokers,
  ssl,
  sasl,
});

export const consumer = kafka.consumer({ groupId: configs.kafka.clientId });

consumer.on('consumer.connect', () => {
  log.info('Consumer is connected');
});

consumer.on('consumer.disconnect', () => {
  log.info('Consumer is disconnected');
});

export default kafka;
