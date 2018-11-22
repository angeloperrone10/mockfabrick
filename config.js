// LOGGER
config.log4js = {
	defaultLevel: 'TRACE',
	appenders: {
		appenders: [
		{
			type: 'file',
			absolute: true,
			filename: '',
			maxLogSize: 2097152,
			backups: 10,
			category: ['main']
		},
		{
			type: 'file',
			absolute: true,
			filename:  '',
			maxLogSize: 2097152,
			backups: 10,
			category: [ 'db' ]
		},
		{
			type: 'file',
			absolute: true,
			filename: '',
			maxLogSize: 2097152,
			backups: 10,
			category: ['email']
		},		
		{
			type: 'console',
			category: ['main', 'db', 'email']
		}
		]

	}
};