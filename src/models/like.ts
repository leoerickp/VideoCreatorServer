import { db } from "../database/connectiondb";
import { DataTypes } from 'sequelize';
import { User } from "./user";
import { Video } from "./video";

export const Like = db.define("like", {
    userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    videoId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    }
})

User.belongsToMany(Video, { through: Like, foreignKey: 'userId', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
Video.belongsToMany(User, { through: Like, foreignKey: 'videoId', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });

User.hasMany(Like);
Like.belongsTo(User);
Video.hasMany(Like);
Like.belongsTo(Video);
