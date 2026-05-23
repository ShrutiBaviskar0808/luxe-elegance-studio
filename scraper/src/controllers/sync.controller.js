const { runSync, getSyncState } = require('../jobs/sync');

exports.trigger = async (req, res) => {
  if (getSyncState().running) {
    return res.status(409).json({ success: false, error: 'Sync already running', state: getSyncState() });
  }
  runSync().catch(() => {});
  res.status(202).json({ success: true, message: 'Sync started', state: getSyncState() });
};

exports.status = async (req, res) => {
  res.json({ success: true, state: getSyncState() });
};
