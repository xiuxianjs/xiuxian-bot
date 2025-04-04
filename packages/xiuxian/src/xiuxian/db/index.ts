export * from './src/connect.js'
export * from './src/models.js'
export * from './src/main.js'
import { Model, ModelCtor } from 'sequelize'
import './src/main.js'
import { getIoRedis } from '@alemonjs/db'
export const Redis = getIoRedis()
/**
 * 获取模型的属性类型
 */
export type Attributes<T extends ModelCtor<Model>> =
  T extends ModelCtor<infer M>
    ? M extends Model<infer U, object>
      ? U
      : never
    : never
