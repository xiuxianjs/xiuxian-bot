import { Model, sequelize } from '../../connect.js'
import { DataTypes } from 'sequelize'

type ModelProps = {
  id: number
  aid: string
  grade: number
}

class InitModel<T> extends Model<T> {}

export const ass_bag_message = InitModel.init<
  typeof Model<ModelProps>,
  Model<ModelProps>
>(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    aid: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: '宗门编号'
    },
    grade: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: '背包等级'
    }
  },
  {
    sequelize,
    tableName: 'ass_bag_message',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
