const Sequelize = require('sequelize');
const Log = require('./../models/Log');
const path = require('path');

const rootPath = path.dirname(require.main.filename || process.mainModule.filename) + '/src'

/**
 * Controller Log
 */
exports.default = {
    /**
     * Get report by device
     */
    device: (req, res) => {
        Log.getByDevice()
            .then(logs => {
                return res.status(200).json({
                    status: 200,
                    results: mappingLogs
                });
            });
    },
    /**
     * Get report by range date
     */
    rangeDate: (req, res) => {
        const { start, end } = req.query;
        if (!start || !end) {
            return res.status(400).json({
                'error': 'Params is required'
            })
        }
        Log.getByRangeDate(start, end)
            .then(logs => {
                res.status(200).json({
                    status: 200,
                    results: logs
                })
            })
    },
    /**
     * display report with graph
     */
    graph: (req, res) => {
        const { start, end } = req.query;
        Promise.all([Log.getByDevice(false), Log.getByRangeDate(start, end, false)])
            .then(response => {
                return res.render(rootPath + '/views/graph', {
                    message: 'Graph Report',
                    graphData: response
                });
            })
    }
}