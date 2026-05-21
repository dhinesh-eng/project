import { DecoratorConstant } from '../../core/constants/decorator.constant';
import { SetMetadata } from '@nestjs/common/decorators/core/set-metadata.decorator';

export const Authenticate = () => SetMetadata(DecoratorConstant.SECURED, true);
