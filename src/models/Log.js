const db = require('./../config/database').default;
const Sequelize = require('sequelize');
const randomUtils = require('./../utils/random');


/**
 * Operation db
 */
const Op = Sequelize.Op;

/**
 * General operation for get valid log
 */
const generalWhere = {
    user_id: {
        [Op.between]: [100, 100000]
    }
}

/**
 * define fields and table name
 */
const Log = db.define('log', {
    id_logs: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ip_address: {
        type: Sequelize.STRING(30),
        notNull: true
    },
    datetime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        notNull: true
    },
    url: {
        type: Sequelize.TEXT,
        notNull: true
    },
    device: {
        type: Sequelize.TEXT,
        notNull: true
    },
    timestamp: {
        type: Sequelize.INTEGER,
        notNull: true
    },
    user_id: {
        type: Sequelize.BIGINT,
        notNull: true
    },
    is_session: {
        type: Sequelize.STRING(45),
        defaultValue: '0'
    },
    is_not_guest: {
        type: Sequelize.STRING(45),
        defaultValue: '0'
    }
}, {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });


/**
 * Method for get report by device
 */
Log.getByDevice = (withMapping = true) => Log.findAll({
    attributes: ['device', [Sequelize.fn('count', Sequelize.col('id_logs')), 'sum']],
    group: ['device'],
    where: generalWhere
})
    .then(logs => {
        if (withMapping) {
            mappingLogs = {};
            let len = logs.length;
            for (let index = 0; index < len; index++) {
                let { dataValues: { device, sum } } = logs[index];
                mappingLogs[device ? device : 'Anonymous'] = sum

            }
            return mappingLogs;
        }
        return logs;
    })


/**
 * Methof for get report by range date
 * @param {string} start 
 * @param {string} end 
 * @param {boolean} withMapping 
 */
Log.getByRangeDate = (start, end, withMapping = true) => {
    const statement = "SELECT FROM_UNIXTIME(timestamp, '%d-%m-%Y') AS datetime, count(id_logs) as sum from "
        + "logs where (timestamp BETWEEN ? AND ?) AND (user_id BETWEEN ? AND ?) GROUP BY FROM_UNIXTIME(timestamp, '%d-%m-%Y') ASC";
    return db.query(statement, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: [toUnixTimestamp(start), toUnixTimestamp(end), 100, 100000]
    })
        .then(logs => {
            if (withMapping) {
                mappingLogs = {};
                let len = logs.length;
                for (let index = 0; index < len; index++) {
                    let { datetime, sum } = logs[index];
                    mappingLogs[datetime] = sum

                }
                return mappingLogs;
            }
            return logs;
        });
}

/**
 * helper for generate unix timestamp
 * @param {string} date 
 */
function toUnixTimestamp(date) {
    return Math.round(+new Date(date) / 1000);
}

module.exports = Log;
