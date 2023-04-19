import { Kafka, SASLOptions } from 'kafkajs';
import configs from '../../environments';
import log from '../log';

const sasl: SASLOptions | undefined =
  configs.kafka.username && configs.kafka.password
    ? {
        username: configs.kafka.username,
        password: configs.kafka.password,
        mechanism: 'scram-sha-512',
      }
    : undefined;
const ssl = !!sasl;

const kafka = new Kafka({
  clientId: configs.kafka.clientId,
  brokers: configs.kafka.brokers,
  ssl,
  sasl,
});

export const producer = kafka.producer();

producer.on('producer.connect', () => {
  log.info('Producer is connected');
});

producer.on('producer.disconnect', () => {
  log.info('Producer is disconnected');
});

export default kafka;
