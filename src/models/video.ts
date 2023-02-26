import { DataTypes } from 'sequelize';
import { db } from '../database/connectiondb';
import { User } from './user';
export const Video = db.define("video", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(1000),
        allowNull: true
    },
    published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    }
}
)
User.hasMany(Video, { foreignKey: 'userId', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
Video.belongsTo(User, { foreignKey: 'userId' });