import { db } from "../database/connectiondb";
import { DataTypes } from 'sequelize';
import { User } from "./user";

export const Follower = db.define("follower", {
    userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    followerId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    }
})
User.belongsToMany(User, { as: 'creators', through: Follower, foreignKey: 'userId', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
User.belongsToMany(User, { as: 'followers', through: Follower, foreignKey: 'followerId', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });

User.hasMany(Follower);
Follower.belongsTo(User, { as: 'creators', foreignKey: 'userId' });
User.hasMany(Follower);
Follower.belongsTo(User, { as: 'followers', foreignKey: 'followerId' });