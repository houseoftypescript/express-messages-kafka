import { Body, Post, Route, Tags } from 'tsoa';
import configs from '../../common/environments';
import { producer } from '../../common/libs/kafka';

@Tags('Messages')
@Route('messages')
export class MessagesController {
  @Post('produce')
  public async produce(
    @Body() { message }: { message: string }
  ): Promise<{ status: string }> {
    await producer.send({
      topic: configs.kafka.topic,
      messages: [{ value: message }],
    });
    return { status: 'success' };
  }
}
