import 'fastify';
import { FastifySerializerCompiler, FastifyValidatorCompiler } from 'fastify/types/schema';


declare module 'fastify' {
  interface FastifyInstance {
    setSerializerCompiler: (compiler: FastifySerializerCompiler) => void;
    setValidatorCompiler: (compiler: FastifyValidatorCompiler) => void;
  }
}
