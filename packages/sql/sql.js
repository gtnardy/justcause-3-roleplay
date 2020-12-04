'use strict';

const s = class SQL {
	constructor() {
		this.mysql = require('mysql');
		this.pool = this.mysql.createPool({
			// DATA CENSORED
		});
		
		this.pool.on('error', function(error) {
			jcmp.console.print("error");
			if(error.code != 'PROTOCOL_CONNECTION_LOST') {
                jcmp.console.print("[SERVER-ERROR] SQL1: " + JSON.stringify(error));
			}
		})
	}

	query(sqlString, data, callback, player) {
        let hasPlayer = player ? true : false;
		this.pool.getConnection(function(err, connection) {
            if (typeof connection === 'undefined') {
                jcmp.console.print("[SERVER-ERROR] SQL2: " + sqlString + " " + JSON.stringify(err));
                if (err.errorno == "ETIMEDOUT") {
                    jcmp.console.print("trying again...");
                    jcmp.SQL.query(sqlString, data, callback, player);
                }
                return;
            }
            
			connection.query(sqlString, data, function(error, results, fields) {	
				connection.release();
				if (error) {
                    jcmp.console.print("[SERVER-ERROR] SQL2.1: " + sqlString + " " + JSON.stringify(error));
                    return;
                }

                if (hasPlayer && !jcmp.utils.validatePlayer(player)) {
                    jcmp.console.print("Player invalid before SQL.");
                    return;
                }
                
				callback(results);
			});
		});
	}

	execute(sqlString, data) {
		this.pool.getConnection(function(err, connection) {
            if (typeof connection === 'undefined') {
                jcmp.console.print("[SERVER-ERROR] SQL3: " + sqlString + " " + JSON.stringify(err));
                if (err.errorno == "ETIMEDOUT") {
                    jcmp.console.print("trying again...");
                    jcmp.SQL.execute(sqlString, data);
                }                
                return;
            }

			connection.query(sqlString, data, function(error, results, fields) {	
				connection.release();
				if (error) {
                    jcmp.console.print("[SERVER-ERROR] SQL3.1: " + sqlString + " " + JSON.stringify(error));
                    return;
                }
			});
		});
	}
}

jcmp.events.Add("GetSQL", function() {
	return s;
});