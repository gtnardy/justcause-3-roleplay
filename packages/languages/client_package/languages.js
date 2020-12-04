jcmp.languages = {

	texts: {},

	load: function(data) {
		for (let index in data) {
			jcmp.languages.texts[index] = data[index];
		}
	},

	get: function(index, subs) {
		let retorno = jcmp.languages.texts[index.toUpperCase()];
		if (!retorno) return index;

        retorno = retorno[jcmp.localPlayerData.language];
        
        if (!retorno)
            return retorno["en"];

		if (subs) {
			for (let key in subs) {
				retorno = retorno.replace(/%%/, subs[key]);
			}
		}
		return retorno;
	}
};


let texts = {
 
    "COMMANDS_DESCRIPTION_COMMON_PLAYER": {en: "player", pt: "jogador", de: "Spieler"},
 
    // VIP
    "VIP_EXPIRATION": {en: "[#f1c40f][VIP][#FFFFFF] Your VIP will expire on %%!", pt: "[#f1c40f][VIP][#FFFFFF] Seu VIP irá expirar em %%!", de: "[#f1c40f][VIP][#FFFFFF] Dein VIP-Status läuft am %% ab!"},
    "VIP_LEVEL": {en: "[#f1c40f][VIP][#FFFFFF] Your VIP level: [#f1c40f]%%", pt: "[#f1c40f][VIP][#FFFFFF] Seu nível de VIP: [#f1c40f]%%", de: "[#f1c40f][VIP][#FFFFFF] Dein VIP Level: [#f1c40f]%%"},
    "VIP_LEVEL_1": {en: "Normal", pt: "Normal", de: "normal"},
    "VIP_LEVEL_2": {en: "Premium", pt: "Premium", de: "Premium"},
 
    "COMMANDS_DESCRIPTION_SETHOUR": {en: "sets the world hour", pt: "seta a hora do mundo", de: "Ändert die Uhrzeit der Spielwelt"},
    "COMMANDS_DESCRIPTION_SETHOUR_HOUR": {en: "hour (0-23)", pt: "hora (0-23)", de: "stunde (0-23)"},
 
    "COMMANDS_DESCRIPTION_VIP": {en: "see all VIPs commands", pt: "ver todos os comandos de VIP", de: "Zeigt alle VIP commands"},
    "COMMANDS_DESCRIPTION_VIP_STATS": {en: "see your VIP stats", pt: "ver o status do seu VIP", de: "Zeigt deine VIP Statistiken"},
    "COMMANDS_DESCRIPTION_VIP_ACTIVATE": {en: "activate a VIP", pt: "ativar um VIP", de: "Aktiviert einen VIP"},
    "COMMANDS_DESCRIPTION_VIP_ACTIVATE_CODE": {en: "code", pt: "código", de: "code"},
    // VIP
 
    // FACTION
    "FACTION_NAME_1": {en: "Military", pt: "Militares", de: "Militär"},
    "FACTION_NAME_0": {en: "Neutral", pt: "Neutro", de: "Neutral"},
    "FACTION_NAME_-1": {en: "Rebels", pt: "Rebeldes", de: "Rebellen"},
 
    "FACTION_CNAME_1": {en: "[#e74c3c]Military", pt: "[#e74c3c]Militares", de: "[#e74c3c]Militär"},
    "FACTION_CNAME_-1": {en: "[#3498db]Rebels", pt: "[#3498db]Rebeldes", de: "[#3498db]Rebellen"},
    // FACTION
 
    // COMMON
    "COMMON_YESNO_0": {en: "No", pt: "Não", de: "Nein"},
    "COMMON_YESNO_FALSE": {en: "No", pt: "Não", de: "Nein"},
    "COMMON_YESNO_1": {en: "Yes", pt: "Sim", de: "Ja"},
    "COMMON_YESNO_TRUE": {en: "Yes", pt: "Sim", de: "Ja"},
    "ANNOUNCE_LABEL": {en: "TIP", pt: "DICA", de: "TIP"},
    "COMMON_DURATION": {en: "Duration", pt: "Duração", de: "Dauer"},
    "COMMON_COMMAND": {en: "Command", pt: "Comando", de: "Command"},
    "COMMON_SECONDS": {en: "Seconds", pt: "Segundos", de: "Sekunden"},
    "COMMON_YES": {en: "Yes", pt: "Sim", de: "Ja"},
    "COMMON_NO": {en: "No", pt: "Não", de: "Nein"},
    "COMMON_NONE": {en: "None", pt: "Nenhum", de: "Keine"},
    "COMMON_VALUE_MUST_BE_BETWEEN": {en: "The value must be between %% and %%!", pt: "O valor deve estar entre %% e %%", de: "Der Wert muss sich zwischen %% und %% befinden!"},
    "COMMON_NOT_ENOUGH_MONEY_DESC": {en: "You don't have enough money ($ %%)!", pt: "Você não tem dinheiro suficiente ($ %%)!", de: "Du hast nicht genug Geld($ %%) !"},
    "COMMON_NOT_ENOUGH_MONEY": {en: "You don't have enough money!", pt: "Você não tem dinheiro suficiente!", de: "Du hast nicht genug Geld!"},
    "COMMON_NOT_ENOUGH_MONEY_IN_BANK": {en: "You don't have enough money in the bank!", pt: "Você não tem dinheiro suficiente no banco!", de: "Du hast nicht genug Geld auf der Bank!"},
    "COMMON_ALREADY_OWN_IT": {en: "You already own that!", pt: "Você já possui isso!", de: "Du besitzt das schon!"},
    "COMMON_PURCHASED_IT": {en: "You purchased it!", pt: "Você comprou isso!", de: "Du hast es gekauft!"},
    "COMMON_CANT_DO_THAT_YET": {en: "You can't do that yet!", pt: "Você não pode fazer isso ainda!", de: "Das kann noch nicht verwendet werden!"},
    "COMMON_VIP_ONLY": {en: "VIP only!", pt: "Somente para VIP!", de: "Nur für VIP!"},
    "COMMON_PLAYER_NOT_FOUND": {en: "Player not found!", pt: "Jogador não encontrado!", de: "Spieler nicht gefunden!"},
    "COMMON_PLAYER_NOT_CLOSE": {en: "Player not close!", pt: "Jogador não está perto!", de: "Spieler nicht in Reichweite"},
    "COMMON_CANT_DO_IT": {en: "You can't do it!", pt: "Você não pode fazer isso!", de: "Dass kannst du nicht tun!"},
    "COMMON_NOT_IN_VEHICLE": {en: "You must be in a vehicle!", pt: "Você deve estar em um veículo!", de: "Du musst in einem Fahrzeug sein!"},
	"COMMON_CANT_BE_IN_VEHICLE": {en: "You can't be in a vehicle!", pt: "Você não pode estar em um veículo!", de: "Du kannst nicht in einem Fahrzeug sein!"},
    "COMMON_ALREADY_IN_VEHICLE": {en: "You are already in a vehicle!", pt: "Você já está em um veículo!", de: "Du bist schon in einem Fahrzeug!"},
    // COMMON
 
    // HUD
    "HUD_HOSPITAL_WAIT": {en: "WAIT FOR THE PARAMEDICS!", pt: "ESPERE PELOS PARAMEDICOS!", de: "WARTE AUF DIE SANITÄTER!"},
    "HUD_HOSPITAL_CAN_PAY": {en: "or press <div class='enter-key'></div>%% and pay <span class='evidence'>$100</span> to be resurrected at the nearest hospital", pt: "ou pressione <div class='enter-key'></div>%% e pague <span class='evidence'>$100</span> para renascer no hospital mais proximo", de: "oder drücken <div class='enter-key'></div>%% im chat ein und bezahle <span class='evidence'>$100</span> um am nächsten Krankenhaus behandelt zu werdenS"},
 
    "HUD_ALERT": {en: "ALERT", pt: "ALERTA", de: "ALARM"},
    "HUD_BACK_VEHICLE": {en: "GET BACK TO THE VEHICLE!", pt: "VOLTE AO VEÍCULO!", de: "KEHRE ZUM FAHRZEUG ZURÜCK!"},
    "HUD_TAXIMETER": {en: "TAXIMETER", pt: "TAXIMETRO", de: "TAXIMETER"},
    "HUD_FARE": {en: "Fare: $ %%", pt: "Tarifa: $ %%", de: "Fahrpreis: $ %%"},
    "HUD_FUEL": {en: "FUEL", pt: "GAS",de: "BENZIN"},
    "HUD_HUNGER": {en: "HUNGER", pt: "FOME", de: "HUNGER"},
    "HUD_THIRST": {en: "THIRST", pt: "SEDE", de: "DURST"},
    "HUD_STATS_STEALTH": {en: "Stealth", pt: "Furtividade", de: "Schleichen"},
    "HUD_STATS_STAMINA": {en: "Stamina", pt: "Resistência", de: "Ausdauer"},
    "HUD_STATS_DRIVING": {en: "Driving", pt: "Direção", de: "Fahrkünste"},
    "HUD_STATS_FLYING": {en: "Flying", pt: "Pilotagem", de: "Flugkünste"},
    "HUD_STATS_LUNGCAPACITY": {en: "Lung Capacity", pt: "Fôlego", de: "Lungenkapazität"},
    "HUD_STATS_STRENGTH": {en: "Strength", pt: "Força", de: "Stärke"},
    // HUD
 
    // ROLEPLAY
    "BUS_STOP_WORKING_NOW": {en: "Currently there is %% Bus Driver in service.", pt: "No momento existe %% Motorista de Ônibus em serviço.", de: "Zur Zeit befindet sich %% Busfahrer im Dienst."},
    "BUS_STOP_WORKING_NOW_P": {en: "Currently there are %% Bus Drivers in service.", pt: "No momento existem %% Motoristas de Ônibus em serviço.", de: "Zur Zeit befinden sich %% Busfahrer im Dienst."},
    "JOB_LEVEL_UP": {en: "You levelled up in your Job! Congrats!", pt: "Você upou de nível em seu Emprego! Parabéns!", de: "Dein Job Level ist gestiegen! Gratuliere!"},
    "LEVEL_UP": {en: "You levelled up! Congrats!", pt: "Você upou de nível! Parabéns!", de: "Dein Level ist gestiegen! Gratuliere!"},
    "LEVEL_EXPERIENCE_TIME": {en: "You were rewarded with %% XP by playing on the server!", pt: "Você foi recompensado com %% XP por jogar no servidor!", de: "Du wurdest mit %% XP durch spielen auf dem server belohnt!"},
    "LEVEL_SALARY_TIME": {en: "You have just received your salary, which has been deposited directly into your bank account ($ %%)!", pt: "Você recebeu seu salário, que foi depositado diretamente em sua conta bancária ($ %%)!", de: "Du hast gerade deinen Lohn erhalten, der gleich auf die bank überwiesen wurde ($ %%)!"},
 
    "FUEL_NOT_ENOUGH_FUEL": {en: "You do not have enough fuel!", pt: "Você não tem combustível!", de: "Du hast nicht genug Benzin!"},
 
    "COMMANDS_HELP_LABEL": {en: "~~~~~~~~~~~~~ Commands ~~~~~~~~~~~~~", pt: "~~~~~~~~~~~~~ Comandos ~~~~~~~~~~~~~", de: "~~~~~~~~~~~~~ Commands ~~~~~~~~~~~~~"},
 
    "COMMANDS_DESCRIPTION_SETSITE": {en: "set a site", pt: "cria um local", de: "Platziert einen Standort"},
    "COMMANDS_DESCRIPTION_SETHOUSE": {en: "set a house", pt: "cria uma casa", de: "Platziert ein Haus"},
    "COMMANDS_DESCRIPTION_SETMVEHICLE": {en: "creates a spawn point to your an military vehicle at your current position", pt: "cria um ponto de spawn para o um veículo military em sua posição atual", de: "Erstellt einen Spawnpunkt für dein Militärfahrzeug an deinem aktuellen Standort"},
    "COMMANDS_DESCRIPTION_SETMVEHICLE_IDVEHICLE": {en: "id of military vehicle (consult Syed)", pt: "id do veículo militar (consultar Syed)", de: "ID des Militärfahrzeugs (Wende dich an Syed)"},
    "COMMANDS_DESCRIPTION_SETVEHICLE_COLOR": {en: "color (-1 for random)", pt: "cor (-1 para aleatorio)", de: "Farbe (-1 für zufällig)"},
    "COMMANDS_DESCRIPTION_SETVEHICLE_IDJOB": {en: "ID of job (if reserved)", pt: "id do emprego (se for reservado)", de: "ID des Jobs (wenn reserviert)"},
    "COMMANDS_DESCRIPTION_SETVEHICLE": {en: "creates a spawn point to your current vehicle", pt: "cria um ponto de spawn para o seu veículo atual", de: "Erstellt einen Spawnpunkt für dein aktuelles Fahrzeug"},
    "COMMANDS_DESCRIPTION_DELVEHICLE": {en: "remove the spawn point of your current vehicle", pt: "deleta o ponto de spawn para o seu veículo atual", de: "Entvernt den Spawnpunkt deines aktuellen Fahrzeugs"},
    "COMMANDS_DESCRIPTION_TYCOON": {en: "see the Tycoon of the server", pt: "ver o Magnata do servidor", de: "Lisstet die reichsten Spieler"},
    "COMMANDS_DESCRIPTION_HELP": {en: "see all commands", pt: "ver todos os comandos", de: "Listet alle commands"},
    "COMMANDS_DESCRIPTION_UNSTUCK": {en: "try to unstuck", pt: "tenta te desbugar", de: "Versucht dir vom Festhängen zu helfen"},
    "COMMANDS_DESCRIPTION_LANGUAGE": {en: "changes your current language", pt: "changes your current language"},
    "COMMANDS_DESCRIPTION_LANGUAGE_LANGUAGE": {en: "pt/en/de", pt: "pt/en/de", de: "pt/en/de"},
    "COMMANDS_DESCRIPTION_AFK": {en: "leave the AFK", pt: "sai do AFK", de: "Verlasse den AFK-Status"},
    "COMMANDS_DESCRIPTION_AFK_CODE": {en: "code", pt: "código", de: "code"},
    "COMMANDS_DESCRIPTION_CAMERA_FOV_VALUE": {en: "0.1 - 7", pt: "0.1 - 7", de: "0.1 - 7"},
    "COMMANDS_DESCRIPTION_CAMERA_FOV": {en: "set the camera fov", pt: "seta o FOV da camera", de: "Ändert das FOV der Kamera"},
    "COMMANDS_DESCRIPTION_CAMERA_ATTACH": {en: "attaches the camera at current position", pt: "trava a camera na posição atual", de: "Hält die Kamera an deiner Position an"},
    "COMMANDS_DESCRIPTION_CAMERA": {en: "camera related commands", pt: "comandos relacionados à camera", de: "Commands für die Kamera"},
    "COMMANDS_DESCRIPTION_TOGGLEHUD": {en: "toggles the HUD", pt: "liga/desliga a HUD", de: "Deaktiviert/deaktiviert das HUD"},
    "COMMANDS_DESCRIPTION_PAY": {en: "transfers money to a player (will be taxed +10%)", pt: "transfere dinheiro para um jogador (será taxado +10%)", de: "Überweist Geld an einen anderen Spieler (Mit 10% Steuer)"},
    "COMMANDS_DESCRIPTION_PAY_AMOUNT": {en: "quantity", pt: "quantidade", de: "Menge"},
 
    "ROLEPLAY_DISCORD_ACCOUNT_ASSOCIATED": {en: "The player %% has just associated his Discord Account and got $5,000!", pt: "O jogador %% acabou de associar sua Conta do Discord e ganhou $5,000!", de: "Der Spieler %% hat gerade seinen Discord Account verbunden und erhält $5,000!"},
    "ROLEPLAY_PLAYER_ENTERED": {en: "%% entered the server!", pt: "%% entrou no servidor!", de: "%% hat den Server betreten!"},
    "ROLEPLAY_PLAYER_ENTERED_FIRST": {en: "%% <img src='blank.gif' class='flag flag-%%'/> entered the server for the first time!", pt: "%% <img src='blank.gif' class='flag flag-%%'/> entrou no servidor pela primeira vez!", de: "%% <img src='blank.gif' class='flag flag-%%'/> hat den Server zum ersten Mal vetreten!"},
    "ROLEPLAY_AFK_WRONG_CODE": {en: "Wrong code!", pt: "Código inválido!", de: "Falscher Code!"},
    "ROLEPLAY_NOT_AFK": {en: "You are not AFK!", pt: "Você não está AFK!", de: "Du bist nicht AFK!"},
    "ROLELAY_AFK": {en: "Type <span class='evidence'>/afk %%</span> to exit AFK", pt: "Digite <span class='evidence'>/afk %%</span> para sair do AFK", de: "Gib <span class='evidence'>/afk %%</span> in den Chat ein um den AFK-Status zu verlassen"},
    "ROLELAY_INTERACT": {en: "Interact", pt: "Interagir", de: "Interagieren"},
 
    "ROLEPLAY_PAY_PAID": {en: "You gave $%% (+ $%%) to %%!", pt: "Você deu $%% (+ $%%) para %%!", de: "Du hast %% $%% (+ $%%) gegeben!"},
    "ROLEPLAY_PAY_RECEIVED": {en: "You received $%% from %%!", pt: "Você recebeu $%% de %%!", de: "Du hast $%% von %% erhalten!"},
 
    "ROLEPLAY_YOUR_FIRST_JOB": {en: "Congratulations! You're a Farmer!", pt: "Parabéns! Você é um Agricultor!", de: "Gratulierer! Du bist jetzt ein Farmer!"},
    "ROLEPLAY_YOUR_FIRST_JOB_HUNTER": {en: "Congratulations! You're a Hunter!", pt: "Parabéns! Você é um Caçador!", de: "Gratuliere! Du bist jetzt ein Jäger!"},
    "ROLEPLAY_TYPE_JOB": {en: "open your Interaction Menu (M to know how to work", pt: "abra seu Menu de Interação M para saber como trabalhar", de: "Öffne das Interaktionmenü (M um zu erfhren wie du arbeitest)"},
    "ROLEPLAY_JOB_AGENCY": {en: "Town Hall", pt: "Prefeitura", de: "Rathaus"},
    "ROLEPLAY_DOWN_HERE": {en: "down here", pt: "aqui em baixo", de: "Hier unten"},
	"REPORT_SENT": {en: "Your report has been sent! Soon a mod will review it!", pt: "Seu report foi enviado com sucesso! Em breve será analisado por um de nossos moderadores!", de: "Dein Report wurde gesendet und wird bald überprüft"},
	
	"CONTEXT_MENU_PAY": {en: "Send Money", pt: "Dar Dinheiro", de: "Geld Schicken"},
    // ROLEPLAY
   
    // PERSONAL VEHICLE
    "PERSONAL_VEHICLE": {en: "Personal Vehicle", pt: "Veículo Pessoal", de: "Persönliches Fahrzeug"},
    "PERSONAL_VEHICLE_UNABLE_LOCATE": {en: "Unable to locate your Vehicle right now. Try again.", pt: "Não foi possível localizar o seu Veículo Pessoal, tente novamente.", de: "Es war uns nicht möglich dein Fahrzeug zu orten, versauche es noch einmal."},
    "PERSONAL_VEHICLE_ENTERED_LOCKED": {en: "This vehicle belongs to %% and is [#e74c3c]locked[#FFFFFF].", pt: "Este veículo pertence à %% e está [#e74c3c]trancado[#FFFFFF].", de: "Dieses Fahrzeig gehört %% und ist [#e74c3c]abgesperrt[#FFFFFF]"},
    "PERSONAL_VEHICLE_ENTERED_UNLOCKED": {en: "This vehicle belongs to %% and is [#2ecc71]unlocked[#FFFFFF].", pt: "Este veículo pertence à %% e está [#2ecc71]destrancado[#FFFFFF].", de: "Dieses Fahrzeug gehört %% [#2ecc71]entsperrt[#FFFFFF]"},
    "PERSONAL_VEHICLE_ENTERED_OWN_LOCKED": {en: "Welcome to your vehicle. Actual state: [#e74c3c]locked[#FFFFFF].", pt: "Bem vindo ao seu veículo. Estado atual: [#e74c3c]trancado[#FFFFFF].", de: "Wilkommen in deinem Fahrzeug, aktueller Status: [#e74c3c]abgeschlossen[#FFFFFF]"},
    "PERSONAL_VEHICLE_ENTERED_OWN_UNLOCKED": {en: "Welcome to your vehicle. Actual state: [#2ecc71]unlocked[#ffffff].", pt: "Bem vindo ao seu veículo. Estado atual: [#2ecc71]destrancado[#ffffff].", de: "Wilkommen in deinem Fahrzeug, aktueller Status: [#2ecc71]entsperrt[#ffffff]"},
    "PERSONAL_VEHICLE_EXPLODED": {en: "Your vehicle has just exploded! To retrieve it you must Trigger your Insurance at your House.", pt: "Seu veículo acabou de explodir! Para obtê-lo de volta você precisa Acionar o Seguro em sua Casa.", de: "Dein Fahrzeug wurde gerade zerstört, gehe zu deinem Haus und löse die Versicherung aus!"},
    "PERSONAL_VEHICLE_INSURANCE_TRIGGERED": {en: "You triggered the insurance and your vehicle respawned at your house.", pt: "Você acionou o seguro e seu veículo respawnou em sua casa.", de: "Du hast die Versicherung ausgelöst und das Fahrzeug ist an deinem Haus respawned"},
    "PERSONAL_VEHICLE_SWITCHED": {en: "Your vehicle was parked in front of your house.", pt: "O seu veículo foi estacionado em frente à sua casa.", de: "Dein Fahrzeug wurde vor deinem Haus geparkt."},
    // PERSONAL VEHICLE
 
    // MODERATOR/ADMIN
    "COMMANDS_DESCRIPTION_REPORTS": {en: "see all call request", pt: "ver todos os pedidos de ajuda", de: "Liste alle Forderungen"},
    "COMMANDS_DESCRIPTION_REPORTS_LIST": {en: "list all reports", pt: "lista todos os reports", de: "Liste alle Reports"},
    "COMMANDS_DESCRIPTION_REPORTSGOTO": {en: "teleports you to the report call", pt: "te teleporta para o local de chamado", de: "Teleportiert dich zu dem Report-Bereich"},
    "COMMANDS_DESCRIPTION_REPORTS_GOTO_ID": {en: "id of report", pt: "id do report", de: "ID des Reports"},
    "COMMANDS_DESCRIPTION_REPORTS_DELETE": {en: "delete a report", pt: "deleta um report", de: "Lösche einen Report"},
    "COMMANDS_DESCRIPTION_REPORTS_DELETE_ID": {en: "id of report", pt: "id do report", de: "ID des Reports"},
    "COMMANDS_DESCRIPTION_REPORT": {en: "call the moderators", pt: "chama os moderadores", de: "Rufe einen Moderator"},
    "COMMANDS_DESCRIPTION_REPORT_TEXT": {en: "text", pt: "texto", de: "Text"},
 
    "COMMANDS_DESCRIPTION_BRING": {en: "teleports a player to you", pt: "teleporta um jogador em você", de: "Teleportiert einen Spieler zu dir"},
    "COMMANDS_DESCRIPTION_TP": {en: "teleports you to a player", pt: "teleporta em um jogador", de: "Teleportiert dich zu einem Spieler"},
    "COMMANDS_DESCRIPTION_TPP": {en: "teleports you to a position", pt: "teleporta em uma posição", de: "Teleportiert dich zu einer Position"},
    "COMMANDS_DESCRIPTION_SETATR": {en: "[DANGER] set a attribute of a player", pt: "[PERIGO] seta um atributo de um jogador", de: "[ACHTUNG] setze ein Attribut eines Spielers"},
    // MODERATOR/ADMIN
 
    // NEWSPAPER
    "ROLEPLAY_WEATHER_0": {en: "Sunny", pt: "Ensolarado", de: "Sonnig"},
    "ROLEPLAY_WEATHER_1": {en: "Rainy", pt: "Chuvoso", de: "Regnerisch"},
    "ROLEPLAY_WEATHER_2": {en: "Overcast", pt: "Nublado", de: "Bedeckt"},
    "ROLEPLAY_WEATHER_3": {en: "Thunderstorm", pt: "Tempestade", de: "Gewitter"},
    "ROLEPLAY_WEATHER_4": {en: "Fog", pt: "Nevoeiro", de: "Nebelig"},
    "ROLEPLAY_WEATHER_5": {en: "Snow", pt: "Neve", de: "Schnee"},
 
    "ROLEPLAY_WEATHER_DESCRIPTION_0": {en: "Sunny and pleasant. Morning low 60º and an afternoon high of 95º.", pt: "Ensolarado e agradável. Mínima pela manhã de 60º e máxima pela tarde de 95º", de: "Sonnig und angenehm. Morgens 60° und mittags ein Hoch von 95°."},
    "ROLEPLAY_WEATHER_DESCRIPTION_1": {en: "Increasing clouds with showers arriving late in the day. Low 57º and high 70º.", pt: "Nuvens crescentes com grande humidade chegando no final do dia. Minima de 57º e máxima de 70º.", de: "Eine steigende Anzahl an Wolken mit Schauern später am Tag. Ein Eine Tief von 57° und ein Hoch von 70°."},
    "ROLEPLAY_WEATHER_DESCRIPTION_2": {en: "Partly sunny and warn. Morning low of 60º and afternoon high of 75º.", pt: "Parcialmente ensolarado e quente. Mínima pela manhã de 60º e máxima à tarde de 75º.", de: "Teilweise sonnig und warm. Mirgens ein Tief von 60° und mittags ein Hoch von 75°."},
    "ROLEPLAY_WEATHER_DESCRIPTION_3": {en: "Strong storm with lighting strikes. Low 59º and high of 73º. The sea is spouting fish out! A great day to fish!", pt: "Forte tempestade com raios. Minima de 59º e máxima de 73º. O mais está jorrando peixe para fora! Um ótimo dia para pescar!", de: "Starke Gewitter mit einem Tief von 59° und einen Hoch von 63°. "},
    "ROLEPLAY_WEATHER_DESCRIPTION_4": {en: "Fog all day. Maximum view distance of 100 meters. Low 50º and high of 64º.", pt: "Nevoeiro o dia todo. Visão máxima estimada: 100 metros. Minima de 50º e máxima de 64º.", de: " Nebel über den ganzen Tag mit einer maxinalen Sichtweite von 100 Metern. Ein Tief von 50° und ein Hoch von 64°."},
    "ROLEPLAY_WEATHER_DESCRIPTION_5": {en: "Snow and rain in the afternoon. Low 35º and high of 50º.", pt: "Neve e chuva no período da tarde. Mínima de 35º e máxima de 50º.", de: " Schnee und Regen am Nachmittag. Ein Tief von 35° und ein Hoch von 50°."},
    // NEWSPAPER
 
    // TOWNHALL
    "TOWNHALL_CHANGE_NAME": {en: "[VIP] Change your Name", pt: "[VIP] Mudar seu Nome", de: " [VIP] Ändere deinen Namen"},
    "TOWNHALL_CHANGE_NAME_DESCRIPTION": {en: "[VIP Only] Change your Name", pt: "[Somente VIP] Mudar seu Nome", de: " [Nur für VIP] Ändere deinen Namen"},
    "TOWNHALL_CREWS": {en: "Crews", pt: "Comandos", de: " Gruppen"},
    "TOWNHALL_JOBTYPES": {en: "Job Categories", pt: "Categoria de Empregos", de: "Beruf-Kategorien"},
    "TOWNHALL_JOBS": {en: "Jobs", pt: "Empregos", de: " Berufe"},
    "TOWNHALL_JOBS_DESCRIPTION": {en: "Choose your Job here", pt: "Escolha seu emprego aqui", de: " Wähle einen deinen Beruf"},
    "TOWNHALL_CONFIRM": {en: "Confirm?", pt: "Confirma?", de: "Sicher?"},
    "TOWNHALL_YES": {en: "Yes", pt: "Sim", de: " Ja"},
    "TOWNHALL_NO": {en: "No", pt: "Não", de: " Nein"},
    "TOWNHALL_DECLINE_JOB": {en: "Declines the Job", pt: "Não aceitar o emprego", de: " Lehnt den Beruf ab"},
    "TOWNHALL_ACCEPT_JOB": {en: "Accepts the job", pt: "Aceitar o emprego", de: " Akzeptiert den Beruf"},
    "TOWNHALL_ACCEPT_JOB_COOLDOWN": {en: "Accepts the job.<br>Alert! You can only change your job after %% minutes.", pt: "Aceitar o emprego.<br>Alerta! Você apenas poderá trocar de emprego após %% minutos!", de: " Aktzeptiert den Beruf.<br> Achtung! Du kannst deinen Beruf nach %% Minuten ändern!"},
    "TOWNHALL_TP": {en: "Teleport?", pt: "Teleportar?", de: "Teleportieren?"},
    "TOWNHALL_ACCEPT_JOB_TP": {en: "Teleports to the Job spawn position", pt: "Ser teleportado para o spawn da profissão", de: " Teleportiert dich zun Spawn des Berufs"},
    "TOWNHALL_DECLINE_JOB_TP": {en: "Not be teleported to the Job spawn position", pt: "Não ser teleportado para o spawn da profissão", de: " Nicht zum Spawn des Berufs teleportieren"},
    "TOWNHALL_JOBTYPE_DESCRIPTION": {en: "Opens the menu for this job category", pt: "Abre o menu para essa categoria de emprego", de: " Öffnet das Menü für diese Beruf-Kategorie"},
    "TOWNHALL_NOT_ENOUGHT_LEVEL": {en: "You don't have enough level for this job!", pt: "Você não tem nível suficiente para este emprego!", de: " Dein Level ist zu niedrig für diesen Beruf"},
    "TOWNHALL_CANT_CHANGE_YET": {en: "You have to wait more %% minutes to change your job again!", pt: "Você precisa esperar mais %% minutos para trocar de emprego novamente!", de: " Du musst noch %% Minuten warten bevor du deinen Beruf wieder zu ändern!"},
 
    "TOWNHALL_SPAWN_TELEPORT": {en: "You were teleported to the spawn position of your job!", pt: "Você foi teleportado para a posição de spawn do seu emprego!", de: " Du wirdest zur Spawn-Position deines Berufs teleportiert!"},
    "TOWNHALL_LABEL": {en: "Town Hall", pt: "Prefeitura", de: " Rathaus"},
    "TOWNHALL_LABEL_MINIMUMLEVEL": {en: "Minimum Level", pt: "Nível Mínimo", de: " Mindest-Level"},
    "TOWNHALL_LABEL_DIFFICULTY": {en: "Difficulty", pt: "Dificuldade", de: " Schwierigkeit"},
    "TOWNHALL_LABEL_SALARY": {en: "Salary per hour", pt: "Salário por hora", de: " Lohn pro Stunde"},
    "TOWNHALL_LABEL_COOLDOWN": {en: "Cooldown to Change", pt: "Cooldown para trocar", de: " Zeit bis zum ändern"},
    "TOWNHALL_NOT_FOUND": {en: "Job not found!", pt: "Emprego não encontrado!", de: " Beruf nicht gefunden!"},
    "TOWNHALL_LEVEL_MINIMUM": {en: "Minimum level not reached for this job (%%)!", pt: "Nível mínimo necessário para esse emprego não alcançado (%%)!", de: " Minimales Level für diesen Beruf  nicht erreicht (%%)!"},
    "TOWNHALL_NEW_JOB": {en: "Congratulations on your new job!", pt: "Parabéns pelo seu novo emprego!", de: " Gratuliere zu deinem neuen Beruf!"},
    "TOWNHALL_NEW_JOB_TEXT": {en: "<p>%%</p><i>Open your Interaction Menu <span class='key'>M</span> to see Tutorials and the Job's commands.</i>", pt: "<p>%%</p><i>Abra o Menu de Interação <span class='key'>M</span>) para ver Tutoriais e os comandos da profissão.</i>", de: "<p>%%</p><i> Öffne das Interaktionsmenü class='key'>M</span> um Informationen über die Commands deines Berufs zu bekommen."},
 
    "TOWNHALL_MINIMUM_LEVEL": {en: "Min. level", pt: "Nível min.", de: " Minimales Level"},
    "TOWNHALL_SALARY": {en: "Salary", pt: "Salário", de: " Lohn"},
    "TOWNHALL_VEHICLE_RESERVED_FOR": {en: "This vehicle is reserved for %%, therefore you can not drive it!", pt: "Este veiculo é reservado para %%, portanto você não pode dirigi-lo!", de: "Du kannst dieses Fahrzeug nicht verwenden, da es für %% reserviert ist!"},
    // TOWNHALL
 
    // MILITARY INSTALLATION
    "MILITARYPOST_INFORMATION": {en: "Information", pt: "Informações", de: " Information"},
    "MILITARYPOST_INFORMATION_LABEL_DOMINATION": {en: "Domination", pt: "Dominação", de: " Herrschaft"},
    "MILITARYPOST_INFORMATION_LABEL_BAVARIUM": {en: "Bavarium", pt: "Bavarium", de: " Bavarium"},
    "MILITARYPOST_INFORMATION_LABEL_PROTECTION": {en: "Protection", pt: "Proteção", de: " Schutz"},
 
    "MILITARYINSTALLATIONS_CLEANED": {en: "You have neutralized this Military Installation!", pt: "Você neutralizou esta Instalação Militar!", de: "Du hast die Herrschaft dieser Basis neutralisiert!"},
    "MILITARYINSTALLATIONS_DOMINATED": {en: "You have conquested this Military Installation and earned %% XP and $ %%!", pt: "Você conquistou esta Instalação Militar e ganhou %% XP e $ %%!", de: " Du hast diese Basis übernommen und hast %% XP und $ %% verdient!"},
    "MILITARYINSTALLATIONS_DEFENDED": {en: "You have defended this Military Installation and earned %% XP and $ %%!", pt: "Você defendeu esta Instalação Militar e ganhou %% XP e $ %%!", de: " Du hast diese Basis verteidigt und hast %% XP und $ %% verdient!"},
    "MILITARYINSTALLATIONS_BEING_DOMINATED": {en: "Enemy activities were spotted near %%!", pt: "Atividades inimigas foram vistas perto de %%!", de: " Aktivitäten des Gegners wurden in der Nähe von %% gesichtet!"},
    "MILITARYINSTALLATIONS_NEW_DOMINATION": {en: "The Military Installation of %% was taken by the %%!", pt: "A Instalação Militar de %% foi tomada pelos %%!", de: "Die Basis %% wurde von %% übernommen!"},
    "MILITARYINSTALLATIONS_LOST_CONTROL": {en: "You lost the control of the Military Installation of %%!", pt: "Vocês perderam o controle da Instalação Militar de %%!", de: " Du hast die Kontrolle über die Basis %% verloren!"},
 
    "HUD_CONQUEST_CONQUESTING": {en: "Conquesting Base", pt: "Dominando Base", de: " Übernehme Basis"},
    // MILITARY INSTALLATION
 
    // PAYNSPRAY
    "PAYNSPRAY_CHANGEPLATE": {en: "Enter the new Plate text (MAX 25 characters):", pt: "Entre com o texto da Placa (MAX 25 caractéres):", de: "Gib einen neuen Text für das Nummernschild ein (Max. 25 Zeichen):"},
	"PAYNSPRAY_PLATE": {en: "Vehicle Plate", pt: "Placa do veículo", de: "Nummernschild"},
	"PAYNSPRAY_PLATE_DESCRIPTION": {en: "Change the vehicle Plate", pt: "Alterar a Placa do veículo", de: "Ändere das Nummernschild"},
    "PAYNSPRAY_REPAIR": {en: "Repair", pt: "Reparar", de: " Reparieren"},
    "PAYNSPRAY_REPAIR_DESCRIPTION": {en: "Repair the Health of your vehicle", pt: "Reparar a vida de seu veículo", de: "Repariere die Gesundheit deines Fahrzeugs"},
    "PAYNSPRAY_COLORS": {en: "Paintings", pt: "Pinturas", de: "Lackierungen"},
    "PAYNSPRAY_COLORS_DESCRIPTION": {en: "Paintings for the vehicle", pt: "Pinturas para o veículo", de: "Lackierungen für das Fahrzeug"},
    "PAYNSPRAY_COLOR": {en: "Painting", pt: "Pintura", de: " Lackierungen"},
    "PAYNSPRAY_COLOR_BUY_DESCRIPTION": {en: "Buy this painting", pt: "Comprar essa pintura", de: "Kaufe diese Lackierung"},
    "PAYNSPRAY_NITRO": {en: "Nitro", pt: "Nitro", de: "Nitro"},
    "PAYNSPRAY_NITRO_DESCRIPTION": {en: "Buy nitro for your vehicle", pt: "Comprar nitro para seu veículo", de: "Kaufe Nitro für dein Fahrzeug"},
    "PAYNSPRAY_TURBOJUMP": {en: "Turbo Jump", pt: "Turbo Jump", de: "Turbo Sprung"},
    "PAYNSPRAY_TURBOJUMP_DESCRIPTION": {en: "Buy Turbo Jump for your vehicle", pt: "Comprar Turbo Jump para seu veículo", de: "Kaufe Turbo Sprung für dein Fahrzeug"},
    "PAYNSPRAY_SELL": {en: "Sell Vehicle", pt: "Vender Veículo", de: "Verkaufe Fahrzeug"},
    "PAYNSPRAY_SELL_DESCRIPTION": {en: "Sell your Vehicle", pt: "Vender o seu Veículo", de: "Verkaufe dein Fahrzeug"},
    "PAYNSPRAY_VEHICLESOLD": {en: "You have sold your vehicle for $%%!", pt: "Você vendeu o seu veículo por $%%!", de: "Du hast dein Fahrzeug für $%% verkauft!"},
    "PAYNSPRAY_ENGINE": {en: "Engine", pt: "Motor", de: "Motor"},
    // PAYNSPRAY
    
    // DEALERSHIP
    "DEALERSHIP_LABEL": {en: "Dealership", pt: "Concessionária", de: "Concessionaire"},
    "DEALERSHIP_DONT_HAVE_HOUSE": {en: "Sorry, you must have a house to be able to buy a vehicle.", pt: "Desculpe, você precisa ter uma casa para poder comprar um veículo.", de: "Du musst ein Haus besitzen um Fahrzeuge zu kaufen!"},
    "DEALERSHIP_DONT_HAVE_ENOUGH_GARAGE_SLOT": {en: "Sorry, you don't have enough spaces in your garage.", pt: "Desculpe, você não possui espaço suficiente em sua garagem.", de: "In deiner Garage ist nicht genügent Platz!"},
    "DEALERSHIP_SUBHEADER": {en: "Vehicle Portfolio", pt: "Portifólio de Veículos", de: "Fahrzeug-Angebot"},
    "DEALERSHIP_BUY_IT": {en: "Buy this vehicle.", pt: "Comprar este veículo.", de: "Kaufe dieses Fahrzeug."},
    "DEALERSHIP_PURCHASED_IT": {en: "Congratulations! You have purshased the %%, we parked it right behind you.", pt: "Você comprou um %%, nós o estacionamos logo atrás de você.", de: "Gratuliere zum Kauf deines %%! Wir haben es auf dem Parkplatz hinter dir abgestellt."},
    // DEALERSHIP

    // SNACKBAR
    "SNACKBAR_MENU": {en: "Menu", pt: "Menu", de: "Menü"},
    "SNACKBAR_ITEM_DOES_NOT_EXIST": {en: "The item you entered does not exist.", pt: "O item informado não existe!", de: "Dieser Artikel existiert nicht"},
    "SNACKBAR_DESCRIPTION_ITEM": {en: "Buy a %%", pt: "Comprar um(a) %%", de: "Kaufe den Artikel: %%"},
 
    "SNACKBAR_ITEM_0": {en: "Water", pt: "Água", de: "Wasser"},
    "SNACKBAR_ITEM_1": {en: "Hamburger", pt: "Hamburguer", de: "Hamburger"},
    "SNACKBAR_ITEM_2": {en: "Soda", pt: "Refrigerante", de: "Limonade"},
    "SNACKBAR_ITEM_3": {en: "Chocolate bar", pt: "Barra de chocolate", de: "Schokoladenriegel"},
    "SNACKBAR_ITEM_4": {en: "Fried Chicken", pt: "Frango Frito", de: "Gebratenes Huhn"},
    "SNACKBAR_ITEM_5": {en: "Coffee", pt: "Café", de: "Kaffee"},
    "SNACKBAR_ITEM_6": {en: "Meatstick", pt: "Espetinho de Carne", de: "Fleischstab"},
    "SNACKBAR_ITEM_7": {en: "Kebab", pt: "Kebab", de: "Kebap"},
    "SNACKBAR_ITEM_8": {en: "Natural Juice", pt: "Suco Natural", de: "Multivitamindrink"},
    "SNACKBAR_ITEM_9": {en: "Croissant", pt: "Croissant", de: "Croissant"},
    "SNACKBAR_ITEM_10": {en: "Stuffed Cake", pt: "Bolo Recheado", de: "Gefüllter Kuchen"},
    "SNACKBAR_ITEM_11": {en: "Lemon Pie", pt: "Torta de Limão", de: "Zitronenkuchen"},
    "SNACKBAR_ITEM_12": {en: "Sandwich", pt: "Sandwiche", de: "Sandwich"},
    "SNACKBAR_ITEM_13": {en: "French Fries", pt: "Batatas Fritas", de: "Pommes frittes"},
    "SNACKBAR_ITEM_14": {en: "Potato-Chips", pt: "Batata Ruffles", de: "Kartoffelchips"},
    // SNACKBAR
 
    // DRIVING SCHOOL
    "LICENSES_NOT_HABILITED_CANT_DRIVE": {en: "You can't drive this vehicle because you don't have %%!", pt: "Você não pode dirigir este veículo pois não possui %%!", de: "Ohne %% kannst du diese Fahrzeug nicht verwenden!"},
 
    "LICENSES_NAME_LICENSECAR": {en: "Car's License", pt: "Habilitação Terrestre (Carros)", de: "Auto-Führerschein"},
    "LICENSES_NAME_LICENSEBIKE": {en: "Bike's License", pt: "Habilitação Terrestre (Motos)", de: "Motorrad-Führerschein"},
    "LICENSES_NAME_LICENSEHELI": {en: "Heli's License", pt: "Habilitação Aérea (Helicopteros)", de: "Helikopter-Führerschein"},
    "LICENSES_NAME_LICENSESEA": {en: "Sea's License", pt: "Habilitação Marítima", de: "Boot-Führerschein"},
    "LICENSES_NAME_LICENSEPLANE": {en: "Plane's License", pt: "Habilitação Aérea (Aviões)", de: "Flugschein"},
 
    "DRIVINGSCHOOL_DESCRIPTION_ITEM": {en: "Buy %%", pt: "Comprar %%", de: "Kaufe %%"},
    "DRIVINGSCHOOL_MENU": {en: "Menu", pt: "Menu", de: "Menü"},
    "DRIVING_LICENSE_INVALID": {en: "Invalid id!", pt: "Id Inválido!", de: "Ungültige ID!"},
    "DRIVINGSCHOOL_TEST_INSTRUCTOR": {en: "Driving Instructor", pt: "Instrutor de Direção", de: "Fahrlehrer"},
    "DRIVINGSCHOOL_TEST_TEXT": {en: "Attention! You will have about %% minutes to complete %% circuit laps. For a successful lap watch your speed limit (80 KM/H) and don't hit the vehicle! You only have this vehicle to complete the test, in case you lose it, you will be eliminated.", pt: "Atenção! Você terá aproximadamente %% minutos para fazer melhor de %% voltas no circuito. Para uma volta de sucesso, atente-se ao limite de velocidade (80 KM/H) e não bata o veículo! Você só possui esse veículo para completar o teste, caso você o perca, você estará eliminado.", de: "Achtung! Du hast etwa %% Minuten Zeit um %% Runden zu absolvieren. Damit eine Runde als gültig zählt, muss deine Geschwindigkeit unter 80 KM/H, und das Fahrzeug muss möglichst unbeschädigt bleiben! Du hast nur dieses Fahrzeug für die Fahrprüfung, wird es zerstört zahlt die Prüfung als nicht bestanden."},
    "DRIVINGSCHOOL_TEST_INVALIDLAP": {en: "INVALID LAP!", pt: "VOLTA INVÁLIDA!", de: "UNGÜLTIGE RUNDE!"},
    "DRIVINGSCHOOL_TEST_VALIDLAP": {en: "VALID LAP!", pt: "VOLTA VÁLIDA!", de: "GÜLTIGE RUNDE!"},
    "DRIVINGSCHOOL_TEST_COMPLETED": {en: "Congratulations! You passed the driving-school test and now you have %%!", pt: "Parabéns! Você passou no teste da auto escola e agora possui %%!", de: "Gratiere! Du hast die Farhprüfung des %% bestanden!"},
    "DRIVINGSCHOOL_TEST_DESCLASSIFIED": {en: "Congratulations! You passed the driving-school test and now you have %%!", pt: "Parabéns! Você passou no teste da auto escola e agora possui %%!", de: "Gratiere! Du hast die Farhprüfung des %% bestanden!"},
    "DRIVINGSCHOOL_TEST_DESCLASSIFIED": {en: "You were eliminated from the Driving School test and didn't get your License this time, try again when you think you're ready!", pt: "Você foi eliminado do teste da Auto Escola e não conseguiu obter sua carteira dessa vez, tente novamente quando você achar que estiver pronto!", de: "Du hast die Fahrprüfung nicht bestanden, versuche es noch einmal wenn du dich bereit fühlst!"},
    // DRIVING SCHOOL
 
    // HOSPITAL
    "HOSPITAL_NOT_DEATH": {en: "You are not death!", pt: "Você não está morto!", de: "Du bist nicht tot!"},
    "HOSPITAL_DEATH": {en: "Hospital - Report: You resurrected at the nearest hospital", pt: "Hospital - Relatório: Você renasceu no hospital mais próximo", de: "Krankenhaus - Bericht: Du wurdest am nächsten Krankenhaus versorgt"},
    "HOSPITAL_DEATH_PARAMEDIC": {en: "Paramedic - Report: You have been ressurected by a Paramedic", pt: "Paramédico - Relatório: Você foi revivido por um paramédico", de: "Sanitäter - Bericht: Du wurdest von einem Sanitäter versorgt"},
    "HOSPITAL_NEWB_DEATH": {en: "As you have level below <span style='color: #2ecc71;'>5</span>, you have not suffered the penalties of dying, but consider buying <span style='color: #2ecc71;'>Life</span> and <span style='color: #2ecc71;'>Health Insurance</span> as soon as possible!", pt: "Como você possui nível abaixo de <span style='color: #2ecc71;'>5</span>, você não sofreu as penalidades de morrer, mas considere comprar <span style='color: #2ecc71;'>Seguro de Vida</span> e <span style='color: #2ecc71;'>Plano de Saúde</span> o quanto antes!", de: "Da dein Level unter <span style='color: #2ecc71;'>Level 5</span> ist, hat der Tod noch keine Konsequenzen. Denke jedoch darüber nach die <span style='color:! #2ecc71;'>Lebens-</span> und <span style='color: #2ecc71;'>Gesundheitsversicherung</span> zu kaufen sobald es dir möglich ist"},
 
    "INSURANCE_NAME_LIFEINSURANCE": {en: "Life Insurance", pt: "Seguro de Vida", de: "Lebensversicherung"},
    "INSURANCE_NAME_HEALTHINSURANCE": {en: "Health Insurance", pt: "Plano de Sáude", de: "Gesundheitsversicherung"},
 
    "HOSPITAL_HEALTHINSURANCE": {en: "Your <span style='color: #2ecc71;'>Health Insurance</span> has covered the Hospital expenses!", pt: "Seu <span style='color: #2ecc71;'>Plano de Saúde</span> arcará com as despesas do Hospital!", de: "Deine <span style='color: #2ecc71;'>Gesundheitsversicherung</span> hat die Kosten des Krankenhauses übernommen!"},
    "HOSPITAL_NOT_HEALTHINSURANCE": {en: "Since you don't have <span style='color: #e74c3c;'>Health Insurance</span>, it was deducted <span style='color: #e74c3c;'>$200</span> from your Bank Account to cover hospital expenses!", pt: "Como você não possui <span style='color: #e74c3c;'>Plano de Saúde</span>, foi descontado <span style='color: #e74c3c;'>$200</span> de seu banco para arcar com as despesas hospitalares!", de: "Da du keine <span style='color: #e74c3c;'>Gesundheitsversicherung</span> hast, wurden die Kosten für das Krankenhaus in Höhe von <span style='color: #e74c3c;'>$200</span> von deinem Bankkonto bezahlt!"},
 
    "HOSPITAL_LIFEINSURANCE": {en: "Your <span style='color: #2ecc71;'>Life Insurance</span> has refunded your lost money!", pt: "Seu <span style='color: #2ecc71;'>Seguro de Vida</span> reembolsou seu dinheiro perdido!", de: "Deine <span style='color: #2ecc71;'>Lebensversicherung</span> hat dein verlorenes Geld erstattet!"},
    "HOSPITAL_NOT_LIFEINSURANCE": {en: "Since you don't have <span style='color: #e74c3c;'>Life Insurance</span>, you have lost some of your money in your pocket.", pt: "Como você não possui <span style='color: #e74c3c;'>Seguro de Vida</span>, você perdeu parte de seu dinheiro em seu bolso!", de: "Da du keine <span style='color: #e74c3c;'>Lebensversicherung</span> hast, hast du einiges Geld in deiner Tasche verloren!"},
 
    "HOSPITAL_BUY_HEALTHINSURANCE": {en: "Buy Health Insurance", pt: "Comprar Plano de Saúde", de: "Kaufe die Gesundheitsversicherung"},
    "HOSPITAL_BUY_HEALTHINSURANCE_DESCRIPTION": {en: "Health Insurance will cover hospital expenses when you die.", pt: "Plano de Saúde irá cobrir os gastos com o hospital quando você morrer.", de: "Die Gesundheitsversicherung übernimmt die Kosten des Krankenhauses."},
    "HOSPITAL_BUY_LIFEINSURANCE": {en: "Buy Life Insurance", pt: "Comprar Seguro de Vida", de: "Kaufe die Lebensversicherung"},
    "HOSPITAL_BUY_LIFEINSURANCE_DESCRIPTION": {en: "Life Insurance will refund the money lost from your pocket when you die.", pt: "Seguro de Vida irá reembolsar o dinheiro perdido de seu bolso quando você morrer.", de: "Die Lebensversicherung erstatted verlorenes Geld das du mit dir hast."},
    "HOSPITAL_BUY_HEAL": {en: "Heal", pt: "Curar-se", de: "Heilen"},
    "HOSPITAL_BUY_HEAL_DESCRIPTION": {en: "Pays for the treatment", pt: "Pagar pelo tratamento", de: "Zahlt für die Versorgung"},
    "HOSPITAL_HEALED": {en: "You have been healed!", pt: "Você foi curado!", de: "Du wurdest geheilt"},
    // HOSPITAL
 
    // BANK
    "BANK_ALL": {en: "All", pt: "Tudo", de: "Alles"},
    "BANK_WITHDRAW": {en: "Withdraw", pt: "Sacar", de: "Abheben"},
    "BANK_WITHDRAW_DESCRIPTION": {en: "Withdraw money from your bank", pt: "Sacar dinheiro do banco", de: "Hebe Geld von der Bank ab"},
    "BANK_BALANCE": {en: "Balance", pt: "Saldo", de: "Kontostand"},
    "BANK_SAVINGS": {en: "Savings Income per hour", pt: "Rendimento: por hora", de: "Zinsen pro Stunde"},
    "BANK_DEPOSIT": {en: "Deposit", pt: "Depositar", de: "Einzahlen"},
    "BANK_DEPOSIT_DESCRIPTION": {en: "Deposit money on the Bank", pt: "Depositar dinheiro no banco", de: "Zahle Geld auf dein Konto ein"},
    "BANK_NOT_ENOUGH_MONEY": {en: "You do not have enough money ($ %%)!", pt: "Você não possui dinheiro suficiente ($ %%)!", de: "Du hast nicht genug Geld ($ %%)!"},
    "BANK_DEPOSITED": {en: "You have deposited $%% in the bank!", pt: "Você depositou $%% no banco!", de: "Du hast $ %% auf dein Konto eingezahlt!"},
    "BANK_WITHDRAWN": {en: "You have withdrawn $%% from bank!", pt: "Você sacou $%% do banco!", de: "Du hast $ %% von der Bank abgehoben!"},
    "BANK_STATEMENTS_CLEAR": {en: "No transactions to show.", pt: "Nenhuma transação para mostrar.", de: "Keine überweisungen vorhanden"},
    "BANK_STATEMENTS": {en: "Statements", pt: "Extrato", de: "Protokoll"},
    "BANK_STATEMENTS_DESCRIPTION": {en: "Displaying your last 10 transactions.", pt: "Exibindo suas 10 últimas transações.", de: "Zeigt deine zehn letzten Überweisungen."},
    // BANK
 
    // HOUSE
    "HOUSE_VEHICLE_DONTHAVE": {en: "You still don't own vehicles, buy one at a Dealership!", pt: "Você ainda não possui veículos, compre um em uma Concessionária!", de: "Du besitzt noch keine Fahrzeuge, kaufe eines bei einem Händler!"},
	"HOUSE_VEHICLE_ACTIVE": {en: "ACTIVE", pt: "ATIVO", de: "AKTIV"},
	"HOUSE_VEHICLE_DESTROYED": {en: "DESTROYED", pt: "DESTRUIDO", de: "ZERSTÖRT"},
	"HOUSE_VEHICLE_RESPAWN": {en: "Respawn your vehicle at your Garage.", pt: "Respawnar o seu veículo em sua Garagem.", de: "Respawne dein Fahrzeug an deiner Garage"},
	"HOUSE_VEHICLE_INSURANCE": {en: "Trigger the Insurance to Respawn your vehicle at your Garage ($ %%).", pt: "Acionar o Seguro para respawnar o seu veículo em sua Garagem ($ %%).", de: "Löse die Versicherung aus um deine Fahrzeug an deiner Garage respawnen zu lassen ($ %%)"},
	"HOUSE_VEHICLE_UNLOCKED": {en: "Unlocked", pt: "Destrancado", de: "Entsperrt"},
	"HOUSE_VEHICLE_LOCKED": {en: "Locked", pt: "Trancado", de: "Abgeschlossen"},
    "HOUSE_SPAWN_AT_HOUSE": {en: "Respawn at House", pt: "Respawnar em Casa", de: "Respawne an deinem Haus"},
    "HOUSE_DESCRIPTION_SPAWN_YES": {en: "Respawns at House when reconnecting on the server", pt: "Respawnar em casa quando reconectar ao servidor", de: "Spawne an deinem Haus wenn du den Server betrittst"},
    "HOUSE_DESCRIPTION_SPAWN_NO": {en: "Respawns at your last position", pt: "Respawnar na sua última posição", de: "Spawne an deiner letzten Position"},
    "HOUSE_NAME": {en: "House Name", pt: "Nome da Casa", de: "Name des Hauses"},
    "HOUSE_NAME_DESCRIPTION": {en: "Change the House's Name", pt: "Mudar o Nome da casa", de: "Ändere den Namen des Hauses"},
    "HOUSE_NEW_NAME": {en: "Enter the new name of the house:", pt: "Digite o novo nome da casa:", de: "Gib den neuen Namen des Hauses ein:"},
	"HOUSE_GARAGE_BOUGHT": {en: "You have bought a new Garage Slot!", pt: "Você comprou um novo Slot de Garagem!", de: "Du hast einen neuen Garagenplatz gekauft!"},
	"HOUSE_GARAGE_EMPTY_SLOT": {en: "Empty Slot", pt: "Slot Vazio", de: "Leerer Garagenplatz"},
	"HOUSE_GARAGE_LIMIT_REACHED": {en: "The Garage Slots limit has been reached!", pt: "O limite de Slots de Garagem foi atingido!", de: "Das Fahrzeuglimit der Garage ist erreicht!"},
	"HOUSE_GARAGE_BUY": {en: "Buy a new Garage Slot", pt: "Comprar um novo Slot de Garagem", de: "Kaufe einen neuen Garagenplatz"},
	"HOUSE_GARAGE_BUY_DESCRIPTION": {en: "Buy a new Garage Slot for this House", pt: "Comprar um novo Slot de Garagem para esta Casa", de: "Kaufe einen neuen Garagenplatz für dieses Haus"},
    "HOUSE_GARAGE": {en: "Garage", pt: "Garagem", de: "Garage"},
	"HOUSE_GARAGE_DESCRIPTION": {en: "Access the House's Garage", pt: "Acessar a Garagem da Casa", de: "Zugang zur Hausgarage"},
	"HOUSE_GARAGE_DESCRIPTION_NO_SLOTS": {en: "Your house has no Garage Slots!", pt: "Sua casa não possui Slots de Garagem!", de: "Ihr Haus hat keine Garage Slots!"},    
    "HOUSE_RESIDENTS": {en: "Residents", pt: "Moradores", de: "Bewohner"},
    "HOUSE_SELL": {en: "Sell House", pt: "Vender Casa", de: "Verkaufe das Haus"},
    "HOUSE_BOUGHT": {en: "You bought this house!", pt: "Você comprou essa casa!", de: "Du hast dieses Haus gekauft!"},
    "HOUSE_SOLD": {en: "You sold your house", pt: "Você vendeu sua casa", de: "Du hast dein Haus verkauft"},
    "HOUSE_SELL_CONFIRMATION": {en: "Sell House for $ %%", pt: "Vender Casa por $ %%", de: "Verkaufe das Haus für $ %%"},
    "HOUSE_DESCRIPTION_SELL_YES": {en: "Sell House for $ %% (-25%)", pt: "Vender Casa por $ %% (-25%)", de: "Verkaufe das Haus für $ %% (-25%)"},
    "HOUSE_OWNER": {en: "Owner", pt: "Dono", de: "Besitzer"},
    "HOUSE_BUY": {en: "Buy House", pt: "Comprar Casa", de: "Kaufe dieses Haus"},
    "HOUSE_INFORMATIONS": {en: "Information", pt: "Informações", de: "Information"},
    "HOUSE_VALUE_SELL": {en: "Sale value", pt: "Valor de venda", de: "Verkaufswert"},
    "HOUSE_BUY_CONFIRMATION": {en: "Buy House for $ %%", pt: "Comprar Casa por $ %%", de: "Kaufe dieses Haus für $ %%"},
    "HOUSE_BUY_DESCRIPTION": {en: "Buy this house", pt: "Comprar esta casa", de: "Kaufe dieses Haus"},
    "HOUSE_DESCRIPTION_BUY_YES": {en: "Buy this house for $ %%", pt: "Comprar esta casa por $ %%", de: "Kaufe dieses Haus für $ %%"},
    "HOUSE_VALUE": {en: "Value", pt: "Valor", de: "Wert"},
    "HOUSE_GARAGE_SLOTS": {en: "Garage Slots", pt: "Vagas na Garagem", de: "Garagenplätze"},
    "HOUSE_LOCATION": {en: "Location", pt: "Localização", de: "Standort"},
    "HOUSE_WEAPON_RACK": {en: "Weapon Rack", pt: "Prateleira de Armas", de: "Waffenregal"},
    "HOUSE_WEAPON_RACK_DESCRIPTION": {en: "Change your weapons", pt: "Trocar suas armas", de: "Ändere deine Waffen"},
    "HOUSE_COLOR": {en: "House Color", pt: "Cor da Casa", de: "Farbe des Hauses"},
    "HOUSE_COLOR_DESCRIPTION": {en: "Change the House's Color", pt: "Mudar a Cor da Casa", de: "Ändere die Farbe des Hauses"},
    "HOUSE_COLOR_CHANGED": {en: "The color of the house was changed", pt: "A cor da casa foi alterada", de: "Die Farbe des Hauses wurde geändert"},
    "HOUSE_VIP": {en: "VIP House", pt: "Casa VIP", de: "VIP-Haus"},
    "HOUSE_ALREADY_HAVE_HOUSE": {en: "You already have a house!", pt: "Você já tem uma casa!", de: "Du hast bereits ein Haus!"},
    "HOUSE_VIP_ONLY": {en: "This house is just for VIPs!", pt: "Essa casa é apenas para VIPs!", de: "Dieses Haus ist nur für VIPs!"},
    // HOUSE
 
    // RACE
    "RACE_COMPLETED": {en: "%% completed the race in %%nd place!", pt: "%% completou a corrida em %%º lugar!", de: "%% hat das Rennen auf Platz %% beendet!"},
    "RACE_ENTERED": {en: "Tip: during the race hold 'R' to respawn your vehicle!", pt: "Dica: durante a corrida segure 'R' para respawnar seu veículo!", de: "Tip: Halte 'R' um dein Fahrzeug zu respawnen!"},
    // RACE
 
    // JOB RACER
    "RACER_CREATING": {en: "Creating Race...", pt: "Criando Corrida...", de: "Rennen wird erstellt..."},
    "RACER_SAVED": {en: "You successfully saved your race (#%%)! You can edit at any time on your Interaction Menu.", pt: "Você salvou sua corrida com sucesso (#%%)! Você poderá editá-la a qualquer momento no Menu de Interação.", de: "Dein Rennen wurde gespeichert und hat die ID ('%%). Du kannst es jederzeit vom Interaktionsmenü aus bearbeiten."},
    "RACER_CREATED": {en: "You successfully submitted your race (#%%)! Wait for a moderator to approve it, and then your race will start to be used on the server! You can edit at any time on your Interaction Menu.", pt: "Voce submeteu sua corrida com sucesso (#%%)! Aguarde um moderador aprová-la para começar a ser usada no servidor! Você poderá editá-la a qualquer momento no Menu de Interação.", de: "Dein Rennen mit der ID ('%%) wurde erfolgreich hochgeladen. Warte bis es ein Moderator überprüft sodass es öffentlich zugänglich ist. Du kannst es jederzeit vom Interaktionsmenü aus bearbeiten."},
    "RACECREATOR_CREATED_CHECKPOINT": {en: "You created a Checkpoint!", pt: "Você criou um Checkpoint!", de: "Ein Checkpoint wurde erstellt!"},
    "RACECREATOR_CREATED_STARTING": {en: "You created a Starting Position!", pt: "Você criou um Ponto de Partida!", de: "Eine Start-Position wurde erstellt!"},
    "RACECREATOR_ALREADY_CREATING": {en: "You are already creating a race!", pt: "Você já está criando uma corrida!", de: "Du hast schon ein Rennen erstellt!"},
    "RACECREATOR_STARTING_DELETED": {en: "You deleted this Starting Position", pt: "Você deletou esse Ponto de Partida", de: "Start-Position wurde gelöscht"},
    "RACECREATOR_CHECKPOINT_DELETED": {en: "You deleted this Checkpoint", pt: "Você deletou esse Checkpoint", de: "Checkpoint wurde gelöscht"},
    "RACECREATOR_NO_SPOT_TO_DELETE": {en: "There are no Spot to delete!", pt: "Não há um Spot para deletar!", de: "Es gibt nichts zu löschen!"},
    "RACECREATOR_NEW_NAME": {en: "Enter the race's name (MAX 20 characters):", pt: "Entre com o nome da corrida (MAX 20 caractéres):", de: "Gib dem Rennen einen Namen (Max. 20 Zeichen)"},
    "RACECREATOR_NEW_IMAGE": {en: "Enter the race's image URL (if you have one) - 300x150:", pt: "Entre com a URL da image da corrida (se você tiver) - 300x150:", de: "Big die URL zum Bild des Rennens ein (Falls du eines hast | Max 300x150):"},
    "RACECREATOR_NEW_DESCRIPTION": {en: "Enter a brief description of the race (and tips) (MAX 150 characters):", pt: "Entre com uma breve descrição para a corrida (e dicas) (MAX 150 caractéres):", de: "Gib eine Kurze Beschreibung/Tips des Rennens ein (Max. 150 Zeichen):"},
 
    "RACECREATOR_MENU_EDIT_RACE": {en: "Press <span class='key icon-enter'></span> to edit this track.<br>Note: Editing a track will reset the JCRP Verified and all evaluations.", pt: "Pressione <span class='key icon-enter'></span> para editar essa corrida.<br>Nota: Editar uma corrida irá resetar a Verificação JCRP e todas as avaliações.", de: "Drücke <span class='key icon-enter'></span> um das Rennen zu bearbeiten.<br>Merke: Beim Bearbeiten wird die JCRP-Verifizierung und Statistiken zurückgesetzt."},
    "RACECREATOR_MENU_RACE_CREATOR": {en: "RACE CREATOR", pt: "CRIADOR DE CORRIDA", de: "RACE CREATOR"},
    "RACECREATOR_MENU_INSTRUCTIONS": {en: "Instructions", pt: "Instruções", de: "Tips"},
    "RACECREATOR_MENU_INSTRUCTIONS_DESCRIPTION": {en: "Welcome to Race Creator, tips to your race be accepted by moderators: it must have enough Slots for players (Starting Positions), it must follow race type guidelines (example: if its a Circuit race, then the last Checkpoint should be close of the first), it must have appropriate spacing between Checkpoints and Start Positions, and it should be fun ;). Remember to save your race from time to time so you do not have the risk of losing it.", pt: "Bem vindo ao Criador de Corridas, dicas para sua corrida ser aceita pelos moderadores: possuir Slots suficientes para jogadores (Posições de Largada), seguir as diretrizes do tipo de corrida (exemplo: caso for uma corrida Circuito, então o último Checkpoint deve estar próximo do primeiro), deve possuir espaços apropriados entre Checkpoints e Posições de Largada, e contudo deve ser divertida ;). Lembre-se de ir salvando a corrida de tempos em tempos, assim não corre o risco de perdê-la.", de: "Wilkommen beim Race creator! Hier sind ein Paar Hinweise zum Erstellen des Rennens: Um akzeptiert zu werden, muss das Rennen genug Start-Positionen haben sowie den Leitunslinien folgen (z.b: Ist das Rennen ein Rundrennen, sollte der letzte Checkpoint nahe des ersten sein), es muss einen angemessenen Abstand zwischen zwischen Checkpoints und Start-Positionen besitzen und es sollte Spaß machenn ;). Denke daran dein Rennen immer mal wieder zu speichern um des Risiko, Teile davon zu verlieren, gering bleibt."},
    "RACECREATOR_MENU_NAME": {en: "Name", pt: "Nome", de: "Name"},
    "RACECREATOR_MENU_VEHICLE_TYPE": {en: "Vehicle Type", pt: "Tipo de Veículo", de: "Fahrzeugtyp"},
    "RACELOBBY_MENU_RACE_TYPE": {en: "Race Type", pt: "Tipo da Corrida", de: "Typ des Rennens"},
    "RACE_MENU_VEHICLE_TYPE_DESCRIPTION": {en: "Select the Type of Vehicle for this race", pt: "Selecione o tipo de Veículo para essa corrida", de: "Wähle ein Fahrzeug für das Rennen"},
    "RACECREATOR_MENU_SAVE": {en: "Save", pt: "Salvar", de: "Speichern"},
    "RACECREATOR_MENU_SAVE_DESCRIPTION": {en: "Only save this race. You can edit it later.", pt: "Salvar essa corrida. Você poderá editá-la mais tarde.", de: "Speichere nur das Rennen. Du kannst es später noch verändern"},
    "RACECREATOR_MENU_SUBMIT": {en: "Submit", pt: "Enviar", de: "Hochladen"},
    "RACECREATOR_MENU_SUBMIT_DESCRIPTION": {en: "Submit this race. You can edit it later.", pt: "Enviar essa corrida. Você poderá editá-la mais tarde.", de: "Lade das Rennen hoch. Du kannst es später noch verändern."},
    "RACECREATOR_MENU_CANCEL": {en: "Cancel", pt: "Descartar", de: "Abbrechen"},
    "RACECREATOR_MENU_CANCEL_DESCRIPTION": {en: "Cancel and discard this race.", pt: "Descartar essa corrida.", de: "Breche das Rennen ab und lösche es"},
    "RACECREATOR_MENU_ADD_STARTING_POSITION": {en: "Add Starting Position", pt: "Adicionar Posição de Largada", de: "Erstelle eine Start-Position"},
    "RACECREATOR_MENU_ADD_STARTING_POSITION_DESCRIPTION": {en: "Add a new Starting Position at your position/angle.", pt: "Adicionar uma nova Posição de Largada em sua posição/angulo.", de: "Erstelle eine neue Start-Position an deiner derzeitigen Position und deinem derzeitigen Winkel."},
    "RACECREATOR_MENU_ADD_CHECKPOINT": {en: "Add Checkpoint", pt: "Adicionar Checkpoint", de: "Erstelle einen Checkpoint"},
    "RACECREATOR_MENU_ADD_CHECKPOINT_DESCRIPTION": {en: "Add a new Checkpoint at your position/angle.", pt: "Adicionar um novo Checkpoint em sua posição/angulo.", de: "Erstelle einen neuen Checkpoint an deiner derzeitigen Position und deinem derzeitigen Winkel."},
    "RACECREATOR_MENU_DELETE_STARTING_POSITION": {en: "Undo last Starting Position", pt: "Deletar último Ponto de Partida", de: "Entferne letzte Start-Position"},
    "RACECREATOR_MENU_DELETE_STARTING_POSITION_DESCRIPTION": {en: "Delete the last Starting Position inserted.", pt: "Deletar o último Ponto de Partida inserido.", de: "Entferne die als letztes erstellte Start-Position."},
    "RACECREATOR_MENU_DELETE_CHECKPOINT": {en: "Undo last Checkpoint", pt: "Deletar último Checkpoint", de: "Entferne letzten Checkpoint"},
    "RACECREATOR_MENU_DELETE_CHECKPOINT_DESCRIPTION": {en: "Delete the last Checkpoint inserted.", pt: "Deletar o último Checkpoint inserido.", de: "Entferne den als letztes erstellten Checkpoint."},
    "RACECREATOR_MINIMUM_STARTINGS": {en: "You race must have at least 2 Starting Positions.", pt: "Sua corrida precisa ter no mínimo 2 Posições de Largada.", de: "Dein Rennen muss mindestens zwei Start-Positionen haben."},
    "RACECREATOR_MINIMUM_CHECKPOINTS": {en: "You race must have at least 1 Checkpoint.", pt: "Sua corrida precisa ter no mínimo 1 Checkpoint.", de: "Dein Rennen muss mindestens einen Checkpoint haben."},
    "RACECREATOR_MENU_CHECKPOINT_RADIUS": {en: "Checkpoint Radius", pt: "Raio do Checkpoint", de: "Prüfpunkt-Radius"},
    "RACECREATOR_MENU_CHECKPOINT_RADIUS_DESCRIPTION": {en: "Set the width of the Checkpoints", pt: "Setar o radio dos Checkpoints", de: "Stellen Sie die Breite der Checkpoints ein"},
    //"RACECREATOR_MENU_RACE_CREATOR2": {en: "", pt: "", de: ""},
 
    "RACE_MENU_TYPE_1": {en: "Circuit", pt: "Circuito", de: "Rundrennen"},
    "RACE_MENU_TYPE_2": {en: "Point to Point", pt: "Ponto a Ponto", de: "Punkt zu Punkt"},
    
    "RACE_MENU_CHECKPOINT_RADIUS_5": {en: "Tiny", pt: "Minúsculo", de: "Tiny"},
    "RACE_MENU_CHECKPOINT_RADIUS_10": {en: "Small", pt: "Pequeno", de: "Small"},
    "RACE_MENU_CHECKPOINT_RADIUS_15": {en: "Medium", pt: "Médio", de: "Medium"},
    "RACE_MENU_CHECKPOINT_RADIUS_20": {en: "Normal", pt: "Normal", de: "Normal"},
    "RACE_MENU_CHECKPOINT_RADIUS_25": {en: "Large", pt: "Grande", de: "Large"},
    "RACE_MENU_CHECKPOINT_RADIUS_30": {en: "Giant", pt: "Gigante", de: "Giant"},
 
    "RACE_MENU_VEHICLE_TYPE_1": {en: "Land Vehicles", pt: "Veículos Terrestres", de: "Landfahrzeuge"},
    "RACE_MENU_VEHICLE_TYPE_2": {en: "Sea Vehicles", pt: "Veículos Marítimos", de: "Seefahrzeuge"},
    "RACE_MENU_VEHICLE_TYPE_3": {en: "Planes", pt: "Aviões", de: "Flugzeuge"},
    "RACE_MENU_VEHICLE_TYPE_4": {en: "Helicopters", pt: "Helicopteros", de: "Helikopter"},
 
    "RACE_LABEL": {en: "Race", pt: "Corrida", de: "Rennen"},
    "RACE_DESCLASSIFIED": {en: "You have been desclassified!", pt: "Você foi desclassificado!", de: "Du wurdest disqualifiziert!"},
    "RACE_RACE_DOESNT_EXIST": {en: "Error! This track doesn't exist!", pt: "Erro! Essa pista não existe!", de: "Fehler! Dieses Renne existiert nicht!"},
    "RACE_ALREADY_RACING": {en: "Error! You are already racing!", pt: "Erro! Você já está em uma corrida!", de: "Fehler! Du bist berits in einem Rennen!"},
    "RACE_IS_HAPPENING": {en: "You can't join this race because its already happening!", pt: "Você não pode se unir a essa corrida pois ela já está acontecendo!", de: "Du kannst diesem Rennen nicht beitreten da es schon angefangen hat!"},
    "RACE_LOBBY_IS_FULL": {en: "Oops! The Lobby is full!", pt: "Ops! O Lobby está cheio!", de: "Oops! Die Lobby ist schon voll!"},
 
    "INTERACTION_MENU_DISCORDLINK": {en: "Discord Account", pt: "Conta do Discord", de: "Discord Konto"},
    "INTERACTION_MENU_DISCORDLINK_COMMAND": {en: "Command", pt: "Comando", de: "Command"},
    "INTERACTION_MENU_DISCORDLINK_NOTASSOCIATED": {en: "Not Associated", pt: "Não Associada", de: "Nicht Verbunden"},
    "INTERACTION_MENU_DISCORDLINK_DESCRIPTION": {en: "Use the command above in our <span class='command'>#bot-commands</span> channel on discord to associate your account and get $5,000.", pt: "Use o comando acima em nosso canal <span class='command'>#bot-commmands</span> no discord para associar sua conta e ganhar $5,000.", de: "Verwende den Command oben in unserem <span class='command'>#bot-commands</span> Kanal in Discord um deinen Account zu verbinden und erhalte $5000."},
    "INTERACTION_MENU_DISCORDLINK_DESCRIPTION_ASSOCIATED": {en: "Your account is already associated ;)", pt: "Sua conta já está associada ;)", de: "Dein Account wurde bereits verbunden ;)"},
    
	"INTERACTION_MENU_PERSONALVEHICLE": {en: "Personal Vehicle", pt: "Veículo Pessoal", de: "Persönliches Fahrzeug"},
	"INTERACTION_MENU_PERSONALVEHICLE_DESCRIPTION": {en: "Access your Personal Vehicle menu", pt: "Acessar o menu do seu Veículo Pessoal", de: "Verwende dein Fahrzeugmenü"},
	"INTERACTION_MENU_PERSONALVEHICLE_LOCATE": {en: "Locate", pt: "Localizar", de: "Orten"},
	"INTERACTION_MENU_PERSONALVEHICLE_LOCATE_DESCRIPTION": {en: "Locate your Vehicle.", pt: "Localizar o seu Veículo.", de: "Orte dein Fahrzeug."},
    "INTERACTION_MENU_PERSONALVEHICLE_TRIGGERINSURANCE": {en: "Trigger the Insurance", pt: "Acionar o Seguro", de: "Löst die Versicherung aus"},

	"INTERACTION_MENU_PERSONALVEHICLE_LOCK": {en: "Lock", pt: "Trancar", de: "Abschließen"},
    "INTERACTION_MENU_PERSONALVEHICLE_LOCK_DESCRIPTION": {en: "Switch between locked and unlocked. It allows everyone to use your vehicle.", pt: "Trancar ou Destrancar o seu veículo. Isso permite que qualquer um o utilize.", de: "Wähle zwischen abgeschlossen und abgeschlossen, dies erlaubt allen Spielern dein Fahrzeug zu verweden."},        
    
    "INTERACTION_MENU_SERVICES": {en: "Services", pt: "Serviços", de: "Dienstleistungen"},
	"INTERACTION_MENU_SERVICES_DESCRIPTION": {en: "Menu to call a Service.", pt: "Menu para chamar um Serviço.", de: "Menü für Diesntleistungen."},
	
    "INTERACTION_MENU_SERVICES_SERVICE_TAXI": {en: "Taxi", pt: "Taxi", de: "Taxi"},
    "INTERACTION_MENU_SERVICES_SERVICE_PARAMEDIC": {en: "Paramedic", pt: "Paramedico", de: "Sanitäter"},
    "INTERACTION_MENU_SERVICES_SERVICE_POLICE": {en: "Police", pt: "Policia", de: "Polizist"},
    "INTERACTION_MENU_SERVICES_SERVICE_LAWYER": {en: "Lawyer", pt: "Advogado", de: "Anwalt"},
	"INTERACTION_MENU_SERVICES_SERVICE_MECHANIC": {en: "Mechanic", pt: "Mecânico", de: "Mechaniker"},
	
    "INTERACTION_MENU_SERVICES_SERVICE_DESCRIPTION_TAXI": {en: "Call for a Taxi", pt: "Chamar um Taxi", de: "Taxi"},
    "INTERACTION_MENU_SERVICES_SERVICE_DESCRIPTION_PARAMEDIC": {en: "Call for a Paramedic", pt: "Chamar um Paramedico", de: "Sanitäter"},
    "INTERACTION_MENU_SERVICES_SERVICE_DESCRIPTION_POLICE": {en: "Call for the Police", pt: "Chamar a Policia", de: "Polizist"},
    "INTERACTION_MENU_SERVICES_SERVICE_DESCRIPTION_LAWYER": {en: "Call for a Lawyer", pt: "Chamar um Advogado", de: "Anwalt"},
	"INTERACTION_MENU_SERVICES_SERVICE_DESCRIPTION_MECHANIC": {en: "Call for a Mechanic", pt: "Chamar um Mecânico", de: "Mechaniker"},

    "INTERACTION_MENU_NEWSPAPER": {en: "Newspaper", pt: "Jornal", de: "Zeitung"},
    "INTERACTION_MENU_NEWSPAPER_DESCRIPTION": {en: "Open the Newspaper.", pt: "Abrir o Jornal.", de: "Lies die Zeitung"},
 
    "INTERACTION_MENU_NATIONALID": {en: "My National ID", pt: "Minha Identidade", de: "Mein Personalausweis"},
    "INTERACTION_MENU_NATIONALID_DESCRIPTION": {en: "See your National ID.", pt: "Ver seu documento.", de: "Meinen Personalausweis anschauen."},
 
    "INTERACTION_MENU_HELPEPANEL": {en: "Help Panel", pt: "Painel de Ajuda", de: "Help Panel"},
    "INTERACTION_MENU_HELPEPANEL_DESCRIPTION": {en: "Open the Help Panel.", pt: "Abrir o Painel de Ajuda.", de: "Öffne das Help Panel"},
   
    "INTERACTION_MENU_MY_JOB": {en: "My Job", pt: "Meu Emprego", de: "Meine Arbeit"},

    "INTERACTION_MENU_MYACCOUNT": {en: "My Account", pt: "Minha Conta", de: "Mein Konto"},
    "INTERACTION_MENU_MYACCOUNT_DESCRIPTION": {en: "Options menu for your Account", pt: "Menu de opções para sua conta", de: "OPtionsmenü für deinen Konto"},

    "INTERACTION_MENU_JOB_RACER_MY_RACES": {en: "My Races", pt: "Minhas Corridas", de: "Meine Rennen"},
    "INTERACTION_MENU_JOB_RACER_CREATE_RACE": {en: "Create a new Race", pt: "Criar uma nova corrida", de: "Erstelle ein neues Rennen"},
    "INTERACTION_MENU_JOB_RACER_CREATE_RACE_DESCRIPTION": {en: "Start the Race Creation.", pt: "Iniciar a Criação de uma nova Corrida.", de: "Starte das Erstellen."},
 
    "RACECREATELOBBY_MENU_RACE_SUBMITTED": {en: "Submitted", pt: "Enviada", de: "Hochgeladen"},
    "RACECREATELOBBY_MENU_RACE_VERIFIED": {en: "Verified", pt: "Verificada", de: "Verifiziert"},
    "RACECREATELOBBY_MENU_RACE_EVALUATION": {en: "Evaluation", pt: "Avaliação", de: "Statistiken"},
    "RACECREATELOBBY_MENU_RACE_RECORD": {en: "Record", pt: "Record", de: "Rekord"},
 
    "RACECREATELOBBY_MENU_LOBBY_LABEL_PLAYERS": {en: "Players", pt: "Jogadores", de: "Spieler"},
    "RACECREATELOBBY_MENU_LOBBY_LABEL_HOSTNAME": {en: "Host", pt: "Host", de: "Host"},
    "RACECREATELOBBY_MENU_LOBBY_HOSTNAME": {en: "%%'s Lobby", pt: "Lobby de %%", de: "Lobby von %%"},
    "RACECREATELOBBY_MENU_LOBBY_DESCRIPTION": {en: "Press <span class='key icon-enter'></span> to join this Lobby.", pt: "Pressione <span class='key icon-enter'></span> para se unir a essa corrida.", de: "Drücke <span class='key icon-enter'></span> um der Lobby beizutreten."},
    "RACECREATELOBBY_RACE_LOBBY": {en: "Race Lobby", pt: "Lobby de Corrida", de: "Renn-Lobby"},
    "RACECREATELOBBY_MENU_LOBBIES": {en: "Race Lobbies", pt: "Salas de Corridas", de: "Renn-Lobbies "},
    "RACECREATELOBBY_MENU_LOBBIES_DESCRIPTION": {en: "See all open Race Lobbies.", pt: "Ver todas as Lobbies de Corrida abertas.", de: "Liste alle verfügbaren Renn-Lobbies."},
    "RACECREATELOBBY_MENU_CREATE_LOBBY": {en: "Create a new Race Lobby", pt: "Criar uma Lobby de Corrida", de: "Erstelle eine neue Renn-Lobby"},
    "RACECREATELOBBY_MENU_CREATE_LOBBY_DESCRIPTION": {en: "Create a new custom Race Lobby.", pt: "Criar uma Lobby de Corrida customizada.", de: "Erstelle eine angepasste Renn-Lobby."},
    "RACECREATELOBBY_MENU_DONE": {en: "Done", pt: "Pronto", de: "Fertig"},
    "RACECREATELOBBY_MENU_DONE_DESCRIPTION": {en: "Save and Create the Lobby.", pt: "Salvar e Criar o Lobby.", de: "Erstelle die Lobby."},
    "RACECREATELOBBY_MENU_RACE_BET": {en: "Race Bet", pt: "Aposta da Corrida", de: "Wette"},
    "RACECREATELOBBY_MENU_RACE_BET_DESCRIPTION": {en: "Set the Race Bet that all players will pay to race and the winner will get everything.", pt: "Definir a Aposta da Corrida, que todos os jogadores terão que pagar e o ganhador ficará com tudo.", de: "Lege die Höhe der Wette fest die alle Spieler bezahlen. Am Ende bekommt der Gewinner des Rennens alles."},
    "RACECREATELOBBY_MENU_TURBOJUMP_ENABLED": {en: "Turbo Jump", pt: "Turbo Jump", de: "Turbo Sprung"},
    "RACECREATELOBBY_MENU_TURBOJUMP_ENABLED_DESCRIPTION": {en: "Enables the Turbo Jump.", pt: "Permitir Turbo Jump.", de: "Aktiviert Turbo Sprung"},
    "RACECREATELOBBY_MENU_NITRO_ENABLED": {en: "Nitro", pt: "Nitro", de: "Nitro"},
    "RACECREATELOBBY_MENU_NITRO_ENABLED_DESCRIPTION": {en: "Enables the Nitro.", pt: "Permitir Nitro.", de: "Aktiviert Nitro"},
    "RACECREATELOBBY_MENU_TRACK": {en: "Track", pt: "Pista", de: "Rennstrecke"},
    "RACECREATELOBBY_MENU_TRACK_CHOOSE_DESCRIPTION": {en: "Press <span class='key icon-enter'></span> to see more information for this Track.", pt: "Pressione <span class='key icon-enter'></span> para ver mais informações sobre essa Corrida.", de: "Drücke <span class='key icon-enter'></span> um mehr Informationen über diese Rennstrecke zu erhalten."},
    "RACECREATELOBBY_MENU_TRACK_ACCEPT_DESCRIPTION": {en: "Information", pt: "Informações", de: "Information"},
    "RACECREATELOBBY_MENU_TRACK_INFORMATION": {en: "Race Information", pt: "Informações da Corrida", de: "Information über das Rennen"},
    "RACECREATELOBBY_MENU_TRACK_ACCEPT_CONFIRM": {en: "Confirm", pt: "Confirmar", de: "Bestätigen"},
    "RACECREATELOBBY_MENU_TRACK_ACCEPT_CONFIRM_DESCRIPTION": {en: "Press <span class='key icon-enter'></span> to confirm this track for this race.", pt: "Pressione <span class='key icon-enter'></span> para confirmar essa Pista para essa Corrida.", de: "Drücke <span class='key icon-enter'></span> um die Rennstrecke für dieses Rennen zu bestätigen."},
    "RACECREATELOBBY_MENU_TRACK_ACCEPT_NO_DESCRIPTION": {en: "This track has no additional information.", pt: "Essa corrida não possui informações adicionais.", de: "Diese Rennstrecke hat keine zusätzlichen Informationen."},
    "RACECREATELOBBY_MENU_TRACK_DESCRIPTION": {en: "Press <span class='key icon-enter'></span> to choose this Track for the race.", pt: "Pressione <span class='key icon-enter'></span> para escolher essa Pista para a corrida.", de: "Drücke <span class='key icon-enter'></span> um die Rennstrecke für dieses Rennen zu festzulegen."},
    "RACECREATELOBBY_MENU_TRACK_CHOOSE_DESCRIPTION_MODERATION": {en: "Press <span class='key icon-enter'></span> to see more information for this Track (for approvation purposes).", pt: "Pressione <span class='key icon-enter'></span> para ver mais informações sobre essa Corrida (para aprová-la).", de: "Drücke <span class='key icon-enter'></span> um mehr Informationen über das Rennen zu erhalten (Für Überprüfungszwecke)"},
    "RACECREATELOBBY_MENU_TRACK_LIST": {en: "Track List", pt: "Pistas", de: "Liste"},
    "RACECREATELOBBY_MENU_RACE_MAXPLAYERS": {en: "Max Players", pt: "Máximo de Jogadores", de: "Maximale Spieleranzahl"},
    "RACECREATELOBBY_MENU_RACE_TYPE": {en: "Race Type", pt: "Tipo de Corrida", de: "Typ des Rennens"},
    "RACECREATELOBBY_MENU_RACE_CLASS": {en: "Vehicle Class", pt: "Classe do Veículo", de: "Fahrzeugklasse"},
    "RACECREATELOBBY_MENU_RACE_CLASS_DESCRIPTION": {en: "Choose the Vehicle Class", pt: "Escolha a Classe do Veículo.", de: "Wähle die Fahrzeugklasse."},
    "RACECREATELOBBY_MENU_RACE_TYPE_DESCRIPTION": {en: "Choose the Race Type.", pt: "Escolha o Tipo de Corrida.", de: "Wähle den Typ des Rennens."},
    "RACECREATELOBBY_MENU_LAPS_DESCRIPTION": {en: "Choose the quantity of Laps.", pt: "Escolha a quantidade de Voltas.", de: "Wähle die Anzahle an Runden."},
    "RACECREATELOBBY_MENU_VEHICLE_CLASS_DESCRIPTION": {en: "Press <span class='key icon-enter'></span> to choose the Vehicle Class for this race.", pt: "Pressione <span class='key icon-enter'></span> para escolher a Categoria de Veículo para essa corrida.", de: "Drücke <span class='key icon-enter'></span> um die Fahrzeugklasse für dieses Rennen zu wählen."},
 
    "RACELOBBY_LOBBY_CREATED": {en: "The lobby for the race %% was just created by %%, to participate, open your Interaction Menu.", pt: "O lobby para a corrida %% acaba de ser criada por %%, para participar, abra seu Menu de Interação.", de: "%% hat eine Lobby mit dem Rennen %% erstellt. Um beizutreten, öffne das Interaktionsmenü, wähle Renn-Lobbies aus und trete einer Lobby bei!"},
 
    "RACELOBBY_MENU_LEAVE": {en: "Quit", pt: "Sair", de: "Verlassen"},
    "RACELOBBY_MENU_LEAVE_DESCRIPTION": {en: "Quit the Lobby.", pt: "Sair da Sala.", de: "Verlasse die Lobby"},
    "RACELOBBY_MENU_INVITE": {en: "Invite all Players", pt: "Convidar todos jogadores", de: "Lade alle Spieler ein"},
    "RACELOBBY_MENU_INVITED": {en: "You invited all players.", pt: "Você convidou todos jogadores.", de: "Du hast alle Spieler eingeladen"},
    "RACELOBBY_MENU_INVITE_DESCRIPTION": {en: "Send a notification to all players that the lobby is created.", pt: "Enviar uma notificação para todos os jogadores que o lobby está criado.", de: "Sende allen Spielern eine Nachricht sodass sie über die Lobby bescheid wissen."},
    "RACELOBBY_MENU_INVITE_DESCRIPTION": {en: "Send a notification to all players that the lobby is created.", pt: "Enviar uma notificação para todos os jogadores que o lobby está criado.", de: "Sende allen Spielern eine Nachricht sodass sie über die Lobby bescheid wissen."},
    "RACELOBBY_MENU_VEHICLE": {en: "Vehicle", pt: "Veículo", de: "Fahrzeug"},
    "RACELOBBY_MENU_VEHICLE_DESCRIPTION": {en: "Select your vehicle.", pt: "Selecione o seu Veículo.", de: "Wähle ein Fahrzeug."},
    "RACELOBBY_MENU_START": {en: "Start", pt: "Iniciar", de: "Starten"},
    "RACELOBBY_MENU_START_DESCRIPTION": {en: "Save options and start the race.", pt: "Salvar opções e iniciar a corrida.", de: "Speichere die Einstellungen und starte das Rennen."},
    "RACELOBBY_MENU_READY": {en: "Ready", pt: "Pronto", de: "Bereit"},
    "RACELOBBY_MENU_READY_DESCRIPTION": {en: "Save options and get ready.", pt: "Salvar opções e ficar pronto.", de: "Speichere die Einstellungen und werde bereit."},
    "RACELOBBY_MENU_RACE_NAME": {en: "Race Name", pt: "Nome da Corrida", de: "Name des Rennens"},
    "RACELOBBY_MENU_RACE_CREATED_BY": {en: "Created By", pt: "Criado por", de: "Erstellt von"},
    "RACELOBBY_MENU_RACE_RATING": {en: "Rating", pt: "Avaliação", de: "Bewetung"},
    "RACELOBBY_MENU_RACE_LAPS": {en: "Number of Laps", pt: "Número de Voltas", de: "Anzahl an Runden"},
    "RACELOBBY_MENU_RACE_BET": {en: "Race Bet", pt: "Aposta da Corrida", de: "Wette"},
    "RACELOBBY_MENU_NEW": {en: "New!", pt: "Novo!", de: "Neu!"},
    "RACELOBBY_WAITING_FOR_HOST": {en: "Waiting for Host...", pt: "Esperando pelo Host...", de: "Warten auf den Host..."},
    "RACELOBBY_STARTING": {en: "Starting...", pt: "Iniciando...", de: "Startet..."},
    "RACELOBBY_MENU_HOST_COOLDOWN": {en: "Starting (%%)", pt: "Iniciando (%%)", de: "Startet (%%)"},
 
    "RACE_MENU_LAPS": {en: "Laps", pt: "Voltas", de: "Runden"},
    "RACE_MENU_OPTIONS": {en: "Options", pt: "Opções", de: "Optionen"},
    "RACE_MENU_LOBBY_PLAYERS": {en: "Players %%/%%", pt: "Jogadores %%/%%", de: "Spieler %%/%%"},
    "RACE_MENU_PLAYERS": {en: "Players", pt: "Jogadores", de: "Spieler"},
    "RACE_MENU_VEHICLE_CLASS": {en: "Vehicle Class", pt: "Tipo do Veículo", de: "Fahrzeugklasse"},
 
    "RACEFINISH_MENU_THANKS_EVALUATE": {en: "Thanks for your evaluation!", pt: "Obrigado por avaliar!", de: "Danke deine Bewertung!"},
    "RACEFINISH_MENU_APPROVERACE": {en: "Approve this Race", pt: "Aprovar essa Corrida", de: "Verifiziere dieses Rennen"},
    "RACEFINISH_MENU_APPROVERACE_DESCRIPTION": {en: "Approve this Race and allow it to be used on the server.", pt: "Aprovar essa Corrida e permitir que seja usada no servidor.", de: "Verifiziere das Rennen und mache es öffentlich nutzbar."},
    "RACEFINISH_MENU_DISAPPROVERACE": {en: "Disapprove this Race", pt: "Desaprovar essa Corrida", de: "Hebe die Verifizierung des Rennens auf"},
    "RACEFINISH_MENU_DISAPPROVERACE_DESCRIPTION": {en: "Disapprove and delete this Race.", pt: "Desaprovar e deletar essa Corrida.", de: "Hebe die Verifizierung des Rennens auf und lösche es."},
    "RACEFINISH_MENU_THUMBSUP": {en: "Like", pt: "Gostei", de: "Like"},
    "RACEFINISH_MENU_THUMBSUP_DESCRIPTION": {en: "Evaluate this race positively", pt: "Avaliar essa corrida positivamente", de: "Bewerte das Rennen positiv"},
    "RACEFINISH_MENU_THUMBSDOWN": {en: "Dislike", pt: "Não Gostei", de: "Dislike"},
    "RACEFINISH_MENU_THUMBSDOWN_DESCRIPTION": {en: "Evaluate this race negatively", pt: "Avaliar essa corrida negativamente", de: "Bewerte das Rennen negativ"},
    "RACEFINISH_MENU_LEAVE": {en: "Leave", pt: "Sair", de: "Verlassen"},
    "RACEFINISH_MENU_LEAVE_DESCRIPTION": {en: "Leave the Lobby", pt: "Sair do Lobby", de: "Verlasse die Lobby"},
	// JOB RACER
	
	// SERVICES CALL
    "SERVICES_CALL_TAXI": {en: "Taxi Calls", pt: "Chamados de Taxi", de: "Taxi-Anforderungen"},
    "SERVICES_CALL_PARAMEDIC": {en: "Paramedic Calls", pt: "Chamados de Paramedico", de: "Sanitäter-Anforderungen"},
    "SERVICES_CALL_POLICE": {en: "Police Calls", pt: "Chamados de Policia", de: "Polizei-Anforderungen"},
    "SERVICES_CALL_LAWYER": {en: "Lawyer Calls", pt: "Pedidos de Advogado", de: "Anwalt-Anforderungen"},
	"SERVICES_CALL_MECHANIC": {en: "Mechanic Calls", pt: "Chamados de Mecânico", de: "Mechaniker-Anforderungen"},
	
    "SERVICES_CALL_MESSAGE_TAXI": {en: "Message to Taxi Drivers", pt: "Mensagem aos Taxistas", de: "Nachricht an Taxifahrer"},
    "SERVICES_CALL_MESSAGE_PARAMEDIC": {en: "Message to Paramedics", pt: "Mensagem aos Paramedicos", de: "Nachricht an Sanitäter"},
    "SERVICES_CALL_MESSAGE_POLICE": {en: "Message to Police", pt: "Mensagem aos Policiais", de: "Nachricht an Polizei"},
    "SERVICES_CALL_MESSAGE_LAWYER": {en: "Message to Lawyers", pt: "Mensagem aos Advogados", de: "Nachricht an Anwalt"},
    "SERVICES_CALL_MESSAGE_MECHANIC": {en: "Message to Mechanics", pt: "Mensagem aos Mecânicos", de: "Nachricht an Mechaniker"},

	"SERVICES_NOSERVICES": {en: "No Calls", pt: "Sem Chamados", de: "Keine Anforderungen"},
    "SERVICES_CALL_DESCRIPTION": {en: "See all Calls", pt: "Ver todos os Chamados", de: "Liste der Anforderungen"},
    "SERVICES_ACCEPTED": {en: "You accepted %%'s request, now come to his place to check the incident", pt: "Você aceitou o pedido de %%, vá para o local para checar o incidente", de: "Du hast %%s Anforderung akzeptiert, gehe schnell dorthin um den Vorfall zu überprüfen"},
    "SERVICES_EXPIRED": {en: "Your request has expired.", pt: "O seu chamado expirou.", de: "Deine Anforderung ist abgelaufen"},
	"SERVICES_NEW": {en: "The player %% is requesting for a %%: <i>%%</i>.", pt: "O jogador %% está chamando por um %%: <i>%%</i>", de: "Der Spieler %% fordert %%: <i>%%<i>."},
	"SERVICES_CALLED": {en: "You called for a %%.", pt: "Você chamou por um %%.", de: "Du hast einen %% angefordert."},
    "SERVICES_NOT_CALLED": {en: "There is no one to attend to you at the moment.", pt: "Não há ninguem para te atender no momento.", de: "Für diesen Service ist im Moment kein Spielerverfügbar"},
	"SERVICES_PLAYER_NOT_REQUESTED": {en: "This player isn't requesting for it anymore.", pt: "Este jogador não está mais pedindo por este serviço.", de: "Der Spieler benötigt den Service nicht mehr."},
	"SERVICES_ACCEPTED_YOUR_CALL": {en: "The player %% accepted your call, stay still because he's on his way. ", pt: "O jogador %% aceitou seu pedido, fique parado que ele já está a caminho.", de: "Der Spieler %% hat die Anforderung akzeptiert und ist unterwegs. Versuche dich nicht z weit weg zu bewegen bis er ankommt."},
	// SERVICES CALL
	
    // SITES
    "SITE_NAME_1": {en: "Gas Station", pt: "Posto de Combustível", de: "Tankstelle"},
    "SITE_NAME_2": {en: "Hospital", pt: "Hospital", de: "Krankenhaus"},
    "SITE_NAME_3": {en: "Bank", pt: "Banco", de: "Bank"},
    "SITE_NAME_4": {en: "Town Hall", pt: "Prefeitura", de: "Rathaus"},
    "SITE_NAME_5": {en: "Snack Bar", pt: "Lanchonete", de: "Snack Bar"},
    "SITE_NAME_6": {en: "Police Department", pt: "Departamento de Policia", de: "Polizeistation"},
    "SITE_NAME_7": {en: "Driving School", pt: "Auto-Escola", de: "Fahrschule"},
    "SITE_NAME_8": {en: "Convenience Store", pt: "Loja de Conveniências", de: "Supermarkt"},
    "SITE_NAME_9": {en: "House", pt: "Casa", de: "Haus"},
    "SITE_NAME_10": {en: "City", pt: "Cidade", de: "Stadt"},
    "SITE_NAME_11": {en: "Military Installation", pt: "Instalação Militar", de: "Basis"},
    "SITE_NAME_12": {en: "Pay'n Spray", pt: "Pay'n Spray", de: "Pay'n Spray"},
    "SITE_NAME_13": {en: "Bus Stop", pt: "Ponto de Ônibus", de: "Bushaltestelle"},
    "SITE_NAME_14": {en: "Gun Store", pt: "Loja de Armas", de: "Waffenladen"},
    "SITE_NAME_15": {en: "Selling Site", pt: "Local de Vendas", de: "Verkaufsort"},
    "SITE_NAME_16": {en: "Military Base Post", pt: "Posto da Base Militar", de: "Basispunkt"},
    "SITE_NAME_17": {en: "Race Spot", pt: "Ponto de Corrida", de: "Rennpunkt"},
    "SITE_NAME_18": {en: "Speed Radar (80 km/h)", pt: "Radar (80 km/h)", de: "Blitzer (80 km/h)"},
    "SITE_NAME_19": {en: "Speed Radar (140 km/h)", pt: "Radar (140 km/h)", de: "Blitzer (140 km/h)"},
	"SITE_NAME_20": {en: "Legendary Motorsport", pt: "Legendary Motorsport", de: "Legendary Motorsport"},
	"SITE_NAME_21": {en: "Pedal and Metal Cycles", pt: "Pedal and Metal Cycles", de: "Pedal and Metal Cycles"},
	"SITE_NAME_22": {en: "Southern Medici Super Autos", pt: "Southern Medici Super Autos", de: "Southern Medici Super Autos"},    
	"SITE_NAME_23": {en: "The Bavarium Museum", pt: "The Bavarium Museum", de: "The Bavarium Museum"},    
 
    "SITE_NOT_IN": {en: "You are not at a %%!", pt: "Você não está em um(a) %%!", de: "Du bist kein %%!"},
    "SITES_ENTERED_MENU": {en: "Open the menu", pt: "Abrir menu", de: "Öffne das Menü"},
    // SITES
 
    // CHARACTER CREATION
    "CHARACTERCREATOR_NEW_CHARACTER": {en: "New Character", pt: "Novo Personagem", de: "Neuer Charakter"},
    "CHARACTERCREATOR_SEX": {en: "Sex", pt: "Sexo", de: "Geschlecht"},
    "CHARACTERCREATOR_SEX_DESCRIPTION": {en: "Choose your character sex.", pt: "Escolher o sexo do seu personagem.", de: "Wähle das Geschlecht deines Charakters."},
    "CHARACTERCREATOR_MALE": {en: "Male", pt: "Homem", de: "Männlich"},
    "CHARACTERCREATOR_FEMALE": {en: "Female", pt: "Mulher", de: "Weiblich"},
    "CHARACTERCREATOR_APPEARANCE": {en: "Appearance", pt: "Aparência", de: "Aussehen"},
    "CHARACTERCREATOR_STATS": {en: "Stats", pt: "Status", de: "Werte"},
    "CHARACTERCREATOR_SAVE": {en: "Save & Continue", pt: "Salvar e Continuar", de: "Speichern und fortfahren"},
    "CHARACTERCREATOR_SAVE_DESCRIPTION": {en: "Ready to start playing Just Cause - Roleplay?", pt: "Pronto para iniciar em Just Cause- Roleplay?", de: "Bist du berit für Just Cause - Roleplay?"},
    "CHARACTERCREATOR_NEW_NAME": {en: "Enter your character's name (MAX 20 characters):", pt: "Entre com o nome de seu personagem (MAX 20 caractéres):", de: "Gib den Namen deines Charakters ein (Max. 20 Zeichen):"},
    // CHARACTER CREATION
 
    // GUNSTORE
    "GUNSTORE_PISTOLS": {en: "Pistols", pt: "Pistolas", de: "Pistolen"},
    "GUNSTORE_SHOTGUNS": {en: "Shotguns", pt: "Espingardas", de: "Shotguns"},
    "GUNSTORE_SNIPERS": {en: "Snipers", pt: "Snipers", de: "Sniper"},
    "GUNSTORE_ASSAULTS": {en: "Assault Rifles", pt: "Metralhadoras", de: "Sturmgewehre"},
    "GUNSTORE_ROCKETS": {en: "Rocket Launchers", pt: "Bazookas", de: "Raketenwerfer"},
    "GUNSTORE_HEAVIES": {en: "Heavy Machineguns", pt: "Pesadas", de: "Schwere Maschienenpistolen"},
    "GUNSTORE_SUBMACHINES": {en: "Submachineguns", pt: "Submetralhadoras", de: "Maschienenpistolen"},
 
    "GUNSTORE_EQUIP_WEAPON": {en: "Equip this weapon", pt: "Equipar essa arma", de: "Nimm diese Waffe an dich"},
    "GUNSTORE_BUY_WEAPON": {en: "Buy this weapon<br>Minimum Level: %%", pt: "Comprar essa arma<br>Nível Mínimo: %%", de: "Kaufe diese Waffe<br>Mindest-Level: %%"},
    "GUNSTORE_CATEGORY_DESCRIPTION": {en: "See all weapons", pt: "Ver todas as armas", de: "Liste alle Waffen"},
    "GUNSTORE_DONT_HAVE_WEAPONCARRY": {en: "You don't have Weapon Carry Permit!", pt: "Você não tem Porte de Armas!", de: "Du hast keinen Waffenschein!"},
    "GUNSTORE_WEAPON_EQUIPPED": {en: "Weapon equipped.", pt: "Arma equipada.", de: "Waffe ausgerüstet."},
    "GUNSTORE_WEAPON_BOUGHT": {en: "Weapon bought.", pt: "Arma comprada.", de: "Waffe gekauft."},
    "GUNSTORE_REMOVE_WEAPONS": {en: "Remove all weapons", pt: "Retirar armas", de: "Entferne alle Waffen"},
    "GUNSTORE_REMOVE_WEAPONS_DESCRIPTION": {en: "Remove all weapons from inventory", pt: "Retirar todas armas to inventário", de: "Entferne alle Waffen aus deinem Inventar"},
    "GUNSTORE_REMOVED_WEAPONS": {en: "You removed all weapons from your inventory", pt: "Você retirou todas as armas de seu inventário", de: "Alle Waffen wurden aus deinem Inventar entfernt"},
    // GUNSTORE
 
    // POLICE DEPARTMENT
    "POLICEDEPARTMENT_REMOVED_WANTED": {en: "You are no longer being wanted by Police for [#e74c3c]%%[#ffffff]!", pt: "Você não está mais sendo procurado pela Policia por [#e74c3c]%%[#ffffff]!", de: "Du wirst nun nicht mehr von der Polizei für [#e74c3c]%%[#ffffff] gesucht!"},
    "POLICEDEPARTMENT_REMOVED_SUSPECT": {en: "You are no longer being suspect by Police for [#e74c3c]%%[#ffffff]!", pt: "Você não está mais sendo suspeito pela Policia por [#e74c3c]%%[#ffffff]!", de: "Du wirst nun nicht mehr für [#e74c3c]%%[#ffffff] verdächtigt!"},
    "POLICEDEPARTMENT_NEW_WANTED": {en: "You are wanted by Police for [#e74c3c]%% (%%★)[#ffffff]!", pt: "Você está sendo procurado pela policia por [#e74c3c]%% (%%★)[#ffffff]!", de: "Du wirst von der Polizei aufgrund von [#e74c3c]%% (%%★)[#ffffff] gesucht!"},
    "POLICEDEPARTMENT_NEW_SUSPECT": {en: "You are suspect by Police for [#e74c3c]%%[#ffffff]!", pt: "Você está sendo suspeito pela policia por [#e74c3c]%%[#ffffff]!", de: "Du wirst für [#e74c3c]%%[#ffffff] verdächtigt!"},
    "POLICEDEPARTMENT_PLAYER_IS_WANTED_FOR": {en: "[911] The player [#e74c3c]%%[#ffffff] is wanted by Police for [#e74c3c]%% (%%★)[#ffffff]! %%.", pt: "[911] O jogador [#e74c3c]%%[#ffffff] está sendo procurado pela policia por [#e74c3c]%% (%%★)[#ffffff]! %%.", de: "[911] Der Spieler [#e74c3c]%%[#ffffff] wird aufgrund von [#e74c3c]%% (%%★)[#ffffff] von der Polizei gesucht!"},
    "POLICEDEPARTMENT_PLAYER_IS_SUSPECT_FOR": {en: "[911] The player [#e74c3c]%%[#ffffff] is suspect by Police for [#e74c3c]%%[#ffffff]! Please check the case! %%.", pt: "[911] O jogador [#e74c3c]%%[#ffffff] é suspeito pela policia por [#e74c3c]%%[#ffffff]! Por policiais favor verifiquem o caso! %%.", de: "[911] Der Spieler [#e74c3c]%%[#ffffff] wird für [#e74c3c]%%[#ffffff] verdächtigt! Bitte Überprüfe den Fall!"},
    "POLICEDEPARTMENT_NEAR": {en: "He was last seen near [#e74c3c]%%[#ffffff]", pt: "Ele foi visto pela última vez próximo a [#e74c3c]%%[#ffffff]", de: "Zuletzt wurde er nahe [#e74c3c]%%[#ffffff] gesichtet"},
    "POLICEDEPARTMENT_LOCATION_UNKNOWN": {en: "His location is unknown.", pt: "Sua localização é desconhecida.", de: "Seine Standort ist unbekannt."},
 
    "POLICEDEPARTMENT_NO_STARS_TO_PAY": {en: "You have no Wanted Stars to pay for!", pt: "Você não tem Estrelas de Procurado para pagar!", de: "Du wirst nicht gesucht!"},
    "POLICEDEPARTMENT_TOTAL_COSTS": {en: "Total costs: $%%", pt: "Valor total: $%%", de: "Komplettkosten: $ %%"},
    "POLICEDEPARTMENT_PAID_WANTED": {en: "You paid your Wanted Stars and now your name is clear again!", pt: "Você pagou por suas Estrelas de Procurado e agora seu nome está limpo novamente!", de: "Du hast für deine Straftaten bezahlt, nun ist dein Name wieder sauber!"},
 
    "POLICEDEPARTMENT_EQUIP_WEAPONS": {en: "Equip Weapons", pt: "Equipar Armas", de: "Nimm die Waffe an dich"},
    "POLICEDEPARTMENT_EQUIP_WEAPONS_DESCRIPTION": {en: "Equip your police weapons", pt: "Equipar suas armas de policial", de: "Nimm die Polizeiwaffen an dich"},
    "POLICEDEPARTMENT_WANTEDSTAR_PAID": {en: "This Wanted Star has been paid, your name is clear again!", pt: "Você pagou por essa Estrela de Procurado, seu nome está limpo novamente!", de: "Du hast für deine Straftat bezahlt, nun ist dein Name wieder sauber!"},
    "POLICEDEPARTMENT_PAY_WANTEDSTAR": {en: "Pay Wanted Stars", pt: "Pagar Estrelas de Procurado", de: "Zahle für Straftaten"},
    "POLICEDEPARTMENT_PAY_WANTEDSTAR_DESCRIPTION": {en: "Pay for all Wanted Stars", pt: "Pagar por todas Estrelas de Procurado", de: "Bezahle für alle Straftaten"},
    "POLICEDEPARTMENT_WANTEDSTARS_LIST": {en: "Your Wanted Stars", pt: "Suas Estrelas de Procurado", de: "Deine Straftaten"},
    "POLICEDEPARTMENT_WANTEDSTARS_LIST_DESCRIPTION": {en: "See your all Wanted Stars", pt: "Ver todas suas Estrelas de Procurado", de: "Liste all deine Straftaten"},
    "POLICEDEPARTMENT_NO_WANTEDSTARS_DESCRIPTION": {en: "You have no Wanted Stars to pay for", pt: "Você não possui Estrelas de Procurado para pagar", de: "Du hast keine Straftaten begangen"},
    "POLICEDEPARTMENT_BUY_WEAPONCARRY": {en: "Buy Weapon Carry License", pt: "Comprar Porte de Armas", de: "Kaufe einen Waffenschein"},
    "POLICEDEPARTMENT_BUY_WEAPONCARRY_DESCRIPTION": {en: "Buy the Weapon Carry License to be able to carry weapons legally", pt: "Comprar Porte de Armas para poder andar armado legalmente", de: "Kaufe einen Waffenschein um legal Waffen mit dir führen zu können"},
    // POLICE DEPARTMENT
 
    // COMMANDS
    "COMMANDS_NOT_ALLOWED_NOW": {en: "You can't use commands right now!", pt: "Você não pode usar comandos agora!", de: "Du kannst diesen Command gerade nicht verwenden!"},
    "COMMANDS_COMMAND_VIP_ONLY": {en: "This command is only allowed for VIPs!", pt: "Esse comando é disponível apenas para VIPs!", de: "Dieser Command ist nur für VIPs!"},
    "COMMANDS_COMMAND_NOT_PERMISSION": {en: "You are not allowed to use this command!", pt: "Você não tem permissão para usar esse comando!", de: "Es ist dir nicht erlaubt diesen Command zu nutzen!"},
    "COMMANDS_COMMAND_DOESNT_EXIST": {en: "Command doesn't exist!", pt: "Comando não existe!", de: "Dieser Command existiert nicht!"},
    "COMMANDS_CORRECT_USAGE": {en: "Correct usage:", pt: "Uso correto:", de: "Korrekte Benutzung: "},
    "COMMANDS_PLAYER_NOT_FOUND": {en: "Player not found!", pt: "Jogador não encontrado!", de: "Der Spieler wurde nicht gefunden!"},
    "COMMANDS_MUST_BE_NUMBER": {en: "'%%' must be a number!", pt: "'%%' deve ser um numero!", de: "'%%' muss eine Zahl sein!"},
    "COMMANDS_MUST_BE_POSITIVE_NUMBER": {en: "'%%' must be a positive number!", pt: "'%%' deve ser um numero positivo!", de: "'%%' muss eine positive Zahl sein!"},
    "COMMANDS_PLAYER_NOT_CLOSE": {en: "Player not close!", pt: "Jogador não está perto!", de: "Der Spieler ist außer Reichweite!"},
    "COMMANDS_INVALID_POSITION": {en: "Invalid position!", pt: "Posição inválida!", de: "Ungülitige Position!"},
    "COMMANDS_MUST_WAIT": {en: "You must wait %% seconds to use this command again!", pt: "Você deve esperar mais %% segundos para usar esse comando novamente!", de: "Du musst %% Sekunden warten bevor du diesen Command wieder verwenden kannst!"},
    // COMMANDS
 
    // GAS STATION
    "GASSTATION_TANK_FULL": {en: "Your tank is full!", pt: "Seu tanque está cheio!", de: "Dein Tank ist Voll!"},
    "GASSTATION_FUELLED": {en: "You fuelled %% liters!", pt: "Você abasteceu %% litros!", de: "Du hast %% Liter getankt!"},
    "GASSTATION_COMPLETE": {en: "Complete", pt: "Completar", de: "Komplett"},
    "GASSTATION_FUEL_PRICE": {en: "Liter Price", pt: "Preço do Litro", de: "Literpreis"},
    "GASSTATION_BUY_FUEL": {en: "Fuel", pt: "Abastecer", de: "Benzin"},
    "GASSTATION_BUY_FUEL_DESCRIPTION": {en: "Press Enter to fill up your Gas.", pt: "Pressione Enter para abastecer o seu Combustível.", de: "Drücke Enter um zu tanken."},
    // GAS STATION
   
    // EXPERIENCE BONUS
    "EXPERIENCE_BONUS_LABEL_BONUS_NEWBIE": {en: "+%%% NEW PLAYER BONUS", pt: "++%%% BÔNUS DE NOVO JOGADOR", de: "+%%% Wilkommensbonus"},
    "EXPERIENCE_BONUS_LABEL_BONUS_VIP": {en: "+%%% VIP BONUS", pt: "++%%% BÔNUS VIP", de: "+%%% VIP-Bonus"},
    // EXPERIENCE BONUS
 
    // COLLECTIBLES
    "COLLECTIBLES_AUDIOTAPE_LABEL": {en: "Audio Tape", pt: "Fita de Áudio", de: "Audiokasette"},
    "COLLECTIBLES_TREASURE_LABEL": {en: "Treasure", pt: "Tesouro", de: "Schatz"},
    "COLLECTIBLES_SHRINE_LABEL": {en: "Shrine", pt: "Altar", de: "Schrein"},
    "COLLECTIBLES_TOMB_LABEL": {en: "Ancient Tomb", pt: "Tumba Antiga", de: "Antikes Grab"},
    "COLLECTIBLES_SHRINE_GET": {en: "SHRINE LIT (%% of %%)", pt: "ALTAR ILUMINADO (%% de %%)", de: "SCHREIN ERLEUCHTET (%% von %%)"},
    "COLLECTIBLES_TREASURE_GET": {en: "TREASURE FOUND (%% of %%)", pt: "TESOURO ENCONTRADO (%% de %%)", de: "SCHATZ GEFUNDEN (%% von %%)"},
    "COLLECTIBLES_TOMB_GET": {en: "ANCIENT TOMB FOUND (%% of %%)", pt: "TUMBA ANTIGA ENCONTRADA (%% de %%)", de: "ANTIKES GRAB GEFUNDEN (%% von %%)"},
    "COLLECTIBLES_AUDIOTAPE_GET": {en: "AUDIO TAPE FOUND (%% of %%)", pt: "FITA DE ÁUDIO ENCONTRADA (%% de %%)", de: "AUDIOKASETTE GEFUNDEN (%% von %%)"},
    "COLLECTIBLES_ALREADY_GOT": {en: "You already got it", pt: "Você já pegou isso", de: "Du hast dies schon"},
    // COLLECTIBLES
 
    // REQUEST
    "REQUEST_LABEL": {en: "Request", pt: "Solicitação", de: "Forderung"},
    "REQUEST_DESCRIPTION": {en: "[#2ecc71]F1[#FFFFFF] to ACCEPT or [#c0392b]F2[#FFFFFF] to DECLINE", pt: "[#2ecc71]F1[#FFFFFF] para ACEITAR ou [#c0392b]F2[#FFFFFF] para RECUSAR", de: "Drücke [#2ecc71]F1[#FFFFFF] zum AKTREPTIEREN oder [#c0392b]F2[#FFFFFF] zum ABLEHNEN"},
    "REQUEST_ACCEPTED": {en: "[#2ecc71]ACCEPTED", pt: "[#2ecc71]ACEITO", de: "[#2ecc71] AKZEPTIERT"},
    "REQUEST_PLAYER_BUSY": {en: "The player is busy right now!", pt: "O jogador está ocupado no momento!", de: "Das Spieler ist gerade beschäftigt!"},
    "REQUEST_DECLINED_1": {en: "[#c0392b]DECLINED", pt: "[#c0392b]RECUSADO", de: "[#c0392b] ABGELEHNT"},
    "REQUEST_DECLINED_2": {en: "[#c0392b]PLAYER DISCONNECTED", pt: "[#c0392b]JOGADOR DESCONECTOU", de: "SPIELER VOM SERVER GETRENNT"},
    "REQUEST_DECLINED_3": {en: "[#c0392b]EXPIRED", pt: "[#c0392b]EXPIRADO", de: "[#c0392b] ABGELAUFEN"},
    "REQUEST_DECLINED_4": {en: "[#c0392b]WALKED AWAY", pt: "[#c0392b]SE AFASTOU MUITO", de: "[#c0392b] WEGGELAUFEN"},
    "REQUEST_REMOTE_DECLINED_2": {en: "The player %% disconnected!", pt: "O jogador %% desconectou!", de: "%% hat den Server verlassen"},
    "REQUEST_REMOTE_DECLINED_3": {en: "The request for %% has expired!", pt: "A solicitação para %% expirou!", de: "Die Forderung von %% ist abgelaufen!"},
    "REQUEST_REMOTE_DECLINED_4": {en: "You are far away from %%!", pt: "Você está muito longe de %%!", de: "Du bist zu weit weg von %%!"},
    // REQUEST
 
    // INTERACTION MENU
    "INTERACTION_MENU_LABEL": {en: "Interaction Menu", pt: "Menu de Interação", de: "Interaktionsmenü"},
    "INTERACTION_MENU_PREFERENCES": {en: "Game Preferences", pt: "Preferências", de: "Einstellungen"},
    "INTERACTION_MENU_PREFERENCES_DESCRIPTION": {en: "Your Server Preferences", pt: "Suas Preferências do Servidor", de: "Deine Einstellungen"},
    "INTERACTION_MENU_LASTRADIO": {en: "Radio Station", pt: "Estação de Rádio", de: "Radiosender"},
    "INTERACTION_MENU_LASTRADIO_DESCRIPTION": {en: "Define your Radio Station", pt: "Define sua Estação de Rádio", de: "Stelle einen Radiosender ein"},
    "INTERACTION_MENU_SOUNDTRACK": {en: "Soundtrack Music Volume", pt: "Volume da Música de Fundo", de: "Hintergrundmusik-Lautstärke"},
    "INTERACTION_MENU_SOUNDTRACK_DESCRIPTION": {en: "Changes the background music volume.", pt: "Altera o volume das Músicas de Fundo,", de: "Ändert die Lautstärke der Hintergrund-Musik"},
    "INTERACTION_MENU_KILLYOURSELF": {en: "Kill Yourself", pt: "Se matar", de: "Töte deinen Charakter"},
    "INTERACTION_MENU_KILLYOURSELF_DESCRIPTION": {en: "Are you sure you want to do this?", pt: "Você tem certeza que quer fazer isso?", de: "Sicher das du das tun willst?"},
    "INTERACTION_MENU_JOB_DESCRIPTION": {en: "Options menu for your Job", pt: "Menu de opções para seu emprego", de: "OPtionsmenü für deinen Beruf"},
 
    "INTERACTION_MENU_MODERATION": {en: "Moderation", pt: "Moderação", de: "Moderation"},
    "INTERACTION_MENU_MODERATION_DESCRIPTION": {en: "Moderation Menu", pt: "Menu de Moderação", de: "Moderationsmenü"},
    "INTERACTION_MENU_MODERATION_KICK": {en: "Kick Player", pt: "Kickar Jogador", de: "Spieler Kicken"},
    "INTERACTION_MENU_MODERATION_KICK_DESCRIPTION": {en: "Kick this Player", pt: "Kickar este Jogador", de: "Kicke diesen Spieler"},
    "INTERACTION_MENU_MODERATION_SETSITE": {en: "Set Site", pt: "Setar Localização", de: "Erstelle einen Standort"},
    "INTERACTION_MENU_MODERATION_SETSITE_IDSITETYPE": {en: "Type", pt: "Tipo ", de: "Typ"},
    "INTERACTION_MENU_MODERATION_SETSITE_MINDISTANCE": {en: "Min Distance", pt: "Distância Mínima", de: "Minimale Entfernung"},
    "INTERACTION_MENU_MODERATION_SETSITE_NAME": {en: "Name", pt: "Nome", de: "Name"},
    "INTERACTION_MENU_MODERATION_SETSITE_SET": {en: "Set Site", pt: "Setar Localização", de: "Erstelle einen Standort"},
    "INTERACTION_MENU_MODERATION_SETVEHICLE": {en: "Set Vehicle Spawn", pt: "Setar Spawn de Veículo", de: "Erstelle einen Fahrzeugspawn"},
    "INTERACTION_MENU_MODERATION_SETVEHICLE_JOB": {en: "Reserved for", pt: "Reservado para", de: "Reserviert für"},
    "INTERACTION_MENU_MODERATION_SETVEHICLE_SET": {en: "Set Spawn Position", pt: "Setar Posição de Spawn", de: "Erstelle eine Spawnposition"},
    "INTERACTION_MENU_MODERATION_SETVEHICLE_SET_DESCRIPTION": {en: "Set your current Vehicle at your current Position and Angle", pt: "Setar seu veículo atual para a sua atual Posição e Ângulo", de: "Erstellt einen Spawn mit einer Kopie deines aktuellen Fahrzeugs an deiner Position und deinem Winkel"},
    "INTERACTION_MENU_MODERATION_SETVEHICLE_DELETE": {en: "Delete this Spawn Position", pt: "Deletar essa Posição de Spawn", de: "Lösche diese Spawnposition"},
    "INTERACTION_MENU_MODERATION_SETVEHICLE_DELETE_DESCRIPTION": {en: "Delete this Vehicle Spawn from Database", pt: "Deletar esse Spawn de Veículo do Banco de Dados", de: "Lösche diesen Fahrzeugspawn aus der Datenbank"},
    "INTERACTION_MENU_RANDOM": {en: "Random", pt: "Aleatório", de: "Zufällig"},
    "INTERACTION_MENU_PUBLIC": {en: "Public", pt: "Público", de: "Öffentlich"},
 
    "INTERACTION_MENU_JOB_INFORMATION": {en: "Information", pt: "Informações", de: "Information"},
    "INTERACTION_MENU_JOB_COMMANDS": {en: "Job Commands", pt: "Comandos do Emprego", de: "Beruf-Commands"},
    "INTERACTION_MENU_JOB_COMMANDS_DESCRIPTION": {en: "See all your Job Commands.", pt: "Ver todos os comandos de seu Emprego.", de: "Liste alle Commands deines Berufs."},
 
    "INTERACTION_MENU_VIP": {en: "VIP", pt: "VIP", de: "VIP"},
    "INTERACTION_MENU_VIP_DESCRIPTION": {en: "Commands and Exclusive things for VIPs", pt: "Comandos e coisas exclusivas para VIPs", de: "Commands und exklusive Inhalte für VIPs"},
    "INTERACTION_MENU_VIP_INFORMATION": {en: "Information", pt: "Informações", de: "Information"},
    "INTERACTION_MENU_VIP_INFORMATION_EXPIRATION": {en: "Expiration Date", pt: "Data de Expiração", de: "Auslaufdatum"},
    "INTERACTION_MENU_VIP_INFORMATION_LEVEL": {en: "VIP Level", pt: "Nível do VIP", de: "VIP-Level"},
    // INTERACTION MENU
 
    // GPS
    "GPS_SETTED": {en: "Your GPS has been pointed to %%!", pt: "Seu GPS foi marcado para o(a) %%!", de: "Dein GPS führt dich nun zu: %%!"},
    "GPS_CLEARED": {en: "Your GPS has been clean!", pt: "Seu GPS foi limpo!", de: "Dein GPS wurde zurückgesetzt!"},
    "GPS_LABEL": {en: "GPS", pt: "GPS", de: "GPS"},
    "GPS_LABEL_DESCRIPTION": {en: "Select to establish your Destination in a given location.", pt: "Selecione para estabelecer seu Destino em uma localização determinada.", de: "Wähle ein Ziel aus."},
    "GPS_CLEAR": {en: "Clear GPS", pt: "Limpar GPS", de: "GPS zurücksetzen"},
    "GPS_JOB_SPAWN": {en: "Your Job Spawn", pt: "Seu Spawn do Emprego", de: "Spawn deines Berufs"},
    "GPS_HOUSE_LOCATION": {en: "Your House", pt: "Seu Casa", de: "Dein Haus"},
    // GPS
 
    // JOB TAXI
    "TAXI_TURNON_TAXIMETER": {en: "Starts the Taximeter", pt: "Ligar o Taximetro", de: "Startet das Taximeter"},
    "TAXI_TURNON_TAXIMETER_DESCRIPTION": {en: "Starts the Taximeter having a passenger on your vehicle.", pt: "Inicia o Taximetro tendo um passageiro em seu veículo.", de: "Startet das Taximeter am Beginn der Taxifahrt."},
    "TAXI_NOT_CALLED": {en: "Unfortunately there are no taxis available at the moment!", pt: "Infelizmente não possuem taxistas disponíveis no momento!", de: "Momentan sind keine Taxis verfügbar!"},
    "TAXI_CALLED": {en: "You called for Taxis! Wait on your site!", pt: "Você chamou pelos Taxis! Espere parado em seu local!", de: "Du hast ein Taxi gerufen! Warte an deinem Standort!"},
    "TAXI_EXPIRED": {en: "Your taxi request has been expired!", pt: "Seu pedido de taxi expirou!", de: "Deine Taxi-Anforderung ist abgelaufen!"},
    "TAXI_NEED_TAXI": {en: "[TAXI] The player %% is calling for a Taxi: '%%'.", pt: "[TAXI] O jogador %% está pedindo um Taxi: '%%'.", de: "[TAXI] %% braucht ein Taxi!: '%%'."},
    "TAXI_EXPIRED_PASSENGER": {en: "[TAXI] The player %% doesn't not need a Taxi anymore.", pt: "[TAXI] O jogador %% não precisa mais de um Taxi!", de: "%% braucht kein Taxe mehr."},
    "TAXI_YET_RUNNING": {en: "You are already working!", pt: "Você já está correndo!", de: "Du arbeitest schon!"},
    "TAXI_ENDED_PASSENGER": {en: "The taxi run is over! You paid a total of $ %%!", pt: "A corrida terminou! Você pagou um total de $ %%!", de: "Die Taxifahrt ist zu Ende und du hast insgesamt $ %% bezahlt!"},
    "TAXI_ENDED": {en: "The taxi run is over! You received a total of $ %% and %% XP!", pt: "A corrida terminou! Você recebeu um total de $ %% e %% XP!", de: "Die Taxifahrt ist zu Ende und du hast insgesamt $ %% und %% XP erhalten!"},
    "TAXI_NO_PASSENGER_MONEY": {en: "The passenger has no money!", pt: "O passageiro não possui dinheiro!", de: "Der Fahrgast hat kein Geld!"},
    "TAXI_PASSENGER_HAS_NO_MONEY": {en: "The passenger has no money!", pt: "O passageiro não possui dinheiro!", de: "Der Fahrgast hat kein Geld!"},
    "TAXI_NO_PASSENGER": {en: "You have no passenger!", pt: "Você não possui passageiro!", de: "Du hast keinen Mitfahrer!"},
    "TAXI_NOT_IN_TAXI_12": {en: "You are not in a car!", pt: "Você não está em um carro!", de: "Du must in einem Auto sein!"},
    "TAXI_NOT_IN_TAXI_16": {en: "You are not in a helicopter!", pt: "Você não está em um helicoptero!", de: "Du must in einem Helikopter sein!"},
    "TAXI_STARTED": {en: "The taxi run started, with the the tariff of $ %%.", pt: "A corrida começou, com a tarifa de $ %%!", de: "Du must in einem Helikopter sein!"},
    // JOB TAXI
 
    // JOB CATCHER
    "CATCHER_CATCH_NAME_9_0": {en: "Dove", pt: "Pomba", de: "Taube"},
    "CATCHER_CATCH_NAME_9_1": {en: "Raccoon", pt: "Guaxinim", de: "Waschbär"},
    "CATCHER_CATCH_NAME_9_2": {en: "Squirrel", pt: "Esquilo", de: "Eichhörnchen"},
    "CATCHER_CATCH_NAME_9_3": {en: "Beaver", pt: "Castor", de: "Bieber"},
    "CATCHER_CATCH_NAME_9_4": {en: "Rabbit", pt: "Coelho", de: "Hase"},
    "CATCHER_CATCH_NAME_9_5": {en: "Turkey", pt: "Peru",de: "Truthahn"},
    "CATCHER_CATCH_NAME_9_6": {en: "Sheep", pt: "Ovelha", de: "Schaf"},
    "CATCHER_CATCH_NAME_9_7": {en: "Deer", pt: "Veado", de: "Hirsch"},
    "CATCHER_CATCH_NAME_9_8": {en: "Elk", pt: "Alce", de: "Elch"},
    "CATCHER_CATCH_NAME_9_9": {en: "Wolf", pt: "Lobo", de: "Wolf"},
    "CATCHER_CATCH_NAME_9_10": {en: "Bear", pt: "Urso", de: "Bär"},
 
    "CATCHER_CATCH_NAME_8_0": {en: "Crayfish", pt: "Lagostim", de: "Flusskrebs"},
    "CATCHER_CATCH_NAME_8_1": {en: "Sardine", pt: "Sardinha", de: "Sardine"},
    "CATCHER_CATCH_NAME_8_2": {en: "Herring", pt: "Arenque", de: "Hering"},
    "CATCHER_CATCH_NAME_8_3": {en: "Anchovy", pt: "Anchova", de: "Sardelle"},
    "CATCHER_CATCH_NAME_8_4": {en: "Trout", pt: "Truta", de: "Forelle"},
    "CATCHER_CATCH_NAME_8_5": {en: "Cod", pt: "Bacalhau", de: "Kabeljau"},
    "CATCHER_CATCH_NAME_8_6": {en: "Eel", pt: "Enguia", de: "Aal"},
    "CATCHER_CATCH_NAME_8_7": {en: "Salmon", pt: "Salmão", de: "Lachs"},
    "CATCHER_CATCH_NAME_8_8": {en: "Tuna", pt: "Atum", de: "Thunfisch"},
    "CATCHER_CATCH_NAME_8_9": {en: "Lobster", pt: "Lagosta", de: "Hummer"},
    "CATCHER_CATCH_NAME_8_10": {en: "Swordfish", pt: "Peixe-espada", de: "Schwertfisch"},
    "CATCHER_CATCH_NAME_8_11": {en: "Shark", pt: "Tubarão", de:"Hai"},
 
    "CATCHER_CATCHED_9": {en: "You caught a %% (%%)! [#2ecc71][+%% XP]", pt: "Você capturou um(a) %% (%%)! [#2ecc71][+%% XP]", de: "Du hast einen %% (%%) gefangen! [#2ecc71][+%% XP]"},
    "CATCHER_CATCHED_SPECIAL_9": {en: "You caught a %% (%%)! Congratulations! [#2ecc71][+%% XP]", pt: "Você capturou um(a) %% (%%)! Parabéns! [#2ecc71][+%% XP]", de: "Du hast einen %% (%%!) gafangen! Gratuliere! [#2ecc71][+%% XP]"},
    "CATCHER_CATCHED_8": {en: "You fished a %% (%%)! [#2ecc71][+%% XP]", pt: "Você pescou um(a) %% (%%)! [#2ecc71][+%% XP]", de: "Du hast einen %% (%%!) gefangen! [#2ecc71][+%% XP]"},
    "CATCHER_CATCHED_SPECIAL_8": {en: "You fished a %% (%%)! Congratulations! [#2ecc71][+%% XP]", pt: "Você pescou um(a) %% (%%)! Parabéns! [#2ecc71][+%% XP]", de: "Du hast einen %% (%%!) gafangen! Gratuliere! [#2ecc71][+%% XP]"},
 
    "CATCHER_STOPPED_9": {en: "End of hunting, your hunts: %% kg, start the hunting again or go to a Selling Point to sell your hunting!", pt: "Fim de caça, suas caças: %% kg, começe a caçar ou vá para um Ponto de Vendas para vender suas caças!", de: "Ende der Fischtour! Du hast %% kg an Fischen gefangen! Fische noch einmal oder verkaufe deinen Fisch!"},
    "CATCHER_STOPPED_8": {en: "End of fishing, your fisheries: %% kg, throw the rod again by holding F or go to a Selling Point to sell your fishes!", pt: "Fim de pesca, seus peixes: %% kg, arremesse a vara novamente segurando F ou vá para um Ponto de Vendas para vender seus peixes!", de: "Ende der Fischtour! Wirf die Angel noch einmal aus indem du F hältst oder verkaufe deinen Fisch!"},
 
    "CATCHER_CATCHING_ILLEGAL_SITE_9": {en: "Illegal Hunting Site", pt: "Local de Caça Ilegal", de: "Illegaler Jagdbereich"},
    "CATCHER_CATCHING_SITE_9": {en: "Hunting Site", pt: "Local de Caça", de: "Jagdberich"},
    "CATCHER_CATCHING_ILLEGAL_SITE_8": {en: "Illegal Fishing Spot", pt: "Ponto de Pesca Ilegal", de: "Illegaler Fischberich"},
    "CATCHER_CATCHING_SITE_8": {en: "Fishing Spot", pt: "Ponto de Pesca", de: "Fischbereich"},
 
    "CATCHER_BUTTON_START_8": {en: "Start Fishing", pt: "Iniciar Pesca", de: "Fange an zu fischen"},
    "CATCHER_BUTTON_START_9": {en: "Start Hunting", pt: "Iniciar Caça", de: "Fange an zu Jagen"},
 
    "CATCHER_SELLING_POINT_9": {en: "Selling Point", pt: "Ponto de Venda", de: "Verkaufspunkt"},
    "CATCHER_SELLING_POINT_8": {en: "Selling Point", pt: "Ponto de Venda", de: "Verkaufspunkt"},
    "CATCHER_SELLING_POINT_ALLOWED_ONLY": {en: "You can't access this store!", pt: "Você não pode acessar essa loja!", de: "Du kannst diesen Store nicht betreten!"},
 
    "CATCHER_SELLING_POINT_MY_CATCHES_8": {en: "My Fishes", pt: "Meus Peixes", de: "Meine Fische"},
    "CATCHER_SELLING_POINT_MY_CATCHES_9": {en: "My Hunting", pt: "Minhas Caças", de: "Mein gejagtes"},
 
    "CATCHER_SELLING_POINT_SELL_CATCHES_8": {en: "Sell all Fishes", pt: "Vender todos Peixes", de: "Verkaufe alle Fische"},
    "CATCHER_SELLING_POINT_SELL_CATCHES_9": {en: "Sell all Hunting", pt: "Vender todas Caças", de: "Verkaufe alles gejagdte"},
 
    "CATCHER_SELLING_POINT_ALL_CATCHES_8": {en: "Listing of Fishes", pt: "Listagem dos Peixes", de: "Liste aller Fische"},
    "CATCHER_SELLING_POINT_ALL_CATCHES_9": {en: "Listing of Animals", pt: "Listagem dos Animais", de: "Liste alles gejadgten"},
 
    "CATCHER_SELLING_POINT_ALL_CATCHES_DESCRIPTION_8": {en: "List all known Fishes and its prices", pt: "Listar todos os Peixes conhecidos e seus valores", de: "Liste alle bekannten Fische und ihren Wert"},
    "CATCHER_SELLING_POINT_ALL_CATCHES_DESCRIPTION_9": {en: "List all known Animals and its prices", pt: "Listar todos os Animais conhecidos e seus valores", de: "Liste alles bekannte gejagdte und seinen Wert"},
 
    "CATCHER_SOLD": {en: "You have sold all your %%!", pt: "Você vendeu seus %%!", de: "Du hast alles gejagte verkauft!"},
    "CATCHER_TRAP": {en: "Trap", pt: "Armadilha", de: "Falle"},
    "CATCHER_TRAP_TRIGGERED": {en: "Triggered Trap!", pt: "Armadilha Disparada!", de: "Ausgelöste Falle"},
    "CATCHER_GOT_NOTHING": {en: "Your catch ran away...", pt: "Sua caça fugiu...", de: "Dein Fang rannte weg..."},
    "CATCHER_GOT_TRAP_TRIGGERED": {en: "One of your Traps has been triggered! Go check it out!", pt: "Uma de suas Armadilhas foi disparada! Vá verificar!", de: "Eine deiner Fallen wurde ausgelöst! Schau schnell nach!"},
    "CATCHER_TRAP_GET_CATCHING": {en: "Check Trap", pt: "Checar Armadilha", de: "Falle Überprüfen"},
 
    "CATCHER_PRODUCT_NAME_8": {en: "Fishes", pt: "Peixes", de: "Fische"},
    "CATCHER_PRODUCT_NAME_9": {en: "Animals", pt: "Caças", de: "Tiere"},
    "CATCHER_PRODUCT_NAME_20": {en: "Bavarium", pt: "Bavarium", de: "Bavarium"},
 
    "CATCHER_LEFT_CATCHING_POINT": {en: "You left the %%.", pt: "Você saiu do %%.", de: "Du hast den %% verlassen."},
 
    "CATCHER_IN_SELLING_POINT": {en: "You are at a Selling Point, type /sell to sell your %%.", pt: "Você está em um Ponto de Vendas, digite /sell para vender seus %%.", de: "Du befindest an einem Verkaufspunkt, gib /sell in den Chat ein um dein gejagdtes zu verkaufen."},
    "CATCHER_NOT_IN_SELLING_POINT": {en: "You are not at a Selling Point!", pt: "Você não está em um Ponto de Vendas!", de: "Du musst an einem Verkaufs-punkt sein!"},
 
    "CATCHER_NOT_IN_CATCHING_SITE_9": {en: "You aren't at a Hunting Site!", pt: "Você não está em um Local de Caça!", de: "Du musst an einem Jagd-Berich sein!"},
    "CATCHER_IN_CATCHING_SITE_8": {en: "You are at a Fishing Spot, hold F to throw the fishing rod!", pt: "Você está em um Ponto de Pesca, segure F para aremessar a vara de pesca!", de: "Du bist an einem Fisch-Bereich, halte F um die Angle auszuwerfen!"},
    "CATCHER_NOT_IN_CATCHING_SITE_8": {en: "You aren't at a Fishing Spot!", pt: "Você não está em um Ponto de Pesca!", de: "Du musst an einem Fisch-Bereich sein!"},
 
    "CATCHER_PUT_TRAP": {en: "You set a trap, this will help capture more animals!", pt: "Você colocou uma armadilha, isso ajudará a capturar mais animais!", de: "Du hast eine Falle aufgetstellt, das wird dir helfen mehr zu jagen!"},
 
    "CATCHER_HUD_TEXT_9": {en: "Hunting: %% KG / %%", pt: "Caças: %% KG / %%", de: "Gejages: %% KG / %%"},
    "CATCHER_HUD_TEXT_8": {en: "Fishing: %% KG / %%", pt: "Pescas: %% KG / %%", de: "Fische: %% KG / %%"},
 
    "CATCHER_MUST_BE_HUNTING": {en: "You must be hunting!", pt: "Você precisa estar cançando!", de: "Dazu musst du jagen!"},
 
    "CATCHER_ALREADY_WORKING": {en: "You are alredy working!", pt: "Você já está trabalhando!", de: "Du arbeitest schon!"},
    "CATCHER_START_9": {en: "You started hunting! Keep quiet so you don't scare the animals! Keep an eye on your traps!", pt: "Você começou a caça! Fique em silencio para não espantar os animais! Fique de olho em suas Armadilhas!", de: "Du hast mit der Jagd begonnen. Sei leise um keine Tiere zu erschrecken und achte auf deine Fallen!"},
    "CATCHER_START_8": {en: "You started fishing, relax on the deck! And watch out for the Pirates xD!", pt: "Você começou a pescar! Relaxe no convés! E cuidado com os piratas xD!", de: "Du hast mit dem Fischen begonnen. Entspanne dich einfach an Deck, halte jedoch nach Piraten Ausschau xD"},
    "CATCHER_START_ILLEGAL_8": {en: "You started fishing illegally, the police don't know, but be careful!", pt: "Você começou a pescar de forma ilegal! Os policiais ainda não sabem, porém tome cuidado!", de: "Du Fischst illegal, die Polizei weis nich nichts davon, gib jedoch acht!"},
 
    "CATCHER_RARITY_COMMON": {en: "Common", pt: "Comum", de: "Gewöhnlich"},
    "CATCHER_RARITY_UNUSUAL": {en: "Unusual", pt: "Incomum", de: "Ungewöhnlich"},
    "CATCHER_RARITY_RARE": {en: "Rare", pt: "Raro", de: "Selten"},
    "CATCHER_RARITY_VERYRARE": {en: "Very Rare", pt: "Muito Raro", de: "Sehr selten"},
 
    "CATCHER_CANT_DRIVE_VEHICLE": {en: "You cant do that while being in that vehicle!", pt: "Você não pode fazer isso enquanto estiver nesse veículo!", de: "Du kannst nicht fischen während du in einem Fahrzeug bist!"},
    "CATCHER_HAVE_NOTHING_TO_SELL": {en: "You have nothing to sell!", pt: "Você não tem nada para vender!", de: "Du hast nichts zum verkaufen!"},
 
    "COMMANDS_DESCRIPTION_TRAP": {en: "places a trap to help hunting more animals", pt: "coloca uma armadilha para ajudar a caçar mais animais", de: "Platziert eine Falle um schneller zu jagen"},
    "COMMANDS_DESCRIPTION_HUNT": {en: "starts the hunting", pt: "inicia a caça", de: "Startet die Jagd"},
    "COMMANDS_DESCRIPTION_MYHUNTS": {en: "see how many animals you caught", pt: "vê quantos animais você já caçou", de: "Liste deines gejagten"},
    "COMMANDS_DESCRIPTION_LISTANIMALS": {en: "list all known animals and their information", pt: "lista todos os animais conhecidos e suas informações", de: "Liste alle bekannten Tiere und deren Wert"},
    "COMMANDS_DESCRIPTION_FISH": {en: "throws the Fishing Rod", pt: "arremessa a Vara de Pesca", de: "Wirft die Angel aus"},
    "COMMANDS_DESCRIPTION_SELL": {en: "sell all your Catches", pt: "vende todas as suas Capturas", de: "Verkaufe all dein gejagtes"},
    "COMMANDS_DESCRIPTION_ANCHOR": {en: "thorws the anchor to stop the boat", pt: "arremessa a âncora para parar o barco", de: "Wirft den Anker aus um das Boot anzuhalten"},
    "COMMANDS_DESCRIPTION_MYFISHES": {en: "see how many fish you caught", pt: "vê quantos peixes você pescou", de: "Liste das Gewicht deiner Fische"},
    "COMMANDS_DESCRIPTION_LISTFISHES": {en: "list all known fishes and their information", pt: "lista todos os peixes conhecidos e suas informações", de: "Liste alle bekannten Fische und deren Wert"},
 
    "INTERACTION_MENU_JOB_CATCHER_THROW_ANCHOR": {en: "Fling anchor", pt: "Arremessar Âncora", de: "Anker"},
    "INTERACTION_MENU_JOB_CATCHER_THROW_ANCHOR_DESCRIPTION": {en: "Fling anchor to stop the Boat.", pt: "Arremessar Âncora para parar o Barco.", de: "Wirf den Anker aus um das Boot anzuhalten."},
    "INTERACTION_MENU_JOB_CATCHER_MY_CATCHES": {en: "Your Catches", pt: "Suas Capturas", de: "Dein gejagtes"},
    "INTERACTION_MENU_JOB_CATCHER_MY_CATCHES_DESCRIPTION": {en: "Your Catches.", pt: "Suas Capturas.", de: "Dein gejagtes"},
    "CATCHER_ANCHOR_THREW": {en: "You threw the anchor!", pt: "Você arremesou a âncora!", de: "Du hast den Anker ausgeworfen!"},
    "CATCHER_MUST_BE_IN_A_BOAT": {en: "You must be on a boat!", pt: "Você precisa estar em um barco!", de: "Du musst auf einem Boot sein!"},
    "CATCHER_MUST_BE_SLOW": {en: "You must to be standing still!", pt: "Você precisa estar parado!", de: "Du musst stillstehen!"},
 
    "CATCHER_CATCHED_COUNT_LIMIT": {en: "You're very heavy (%% kg)! Sell what you have to continue!", pt: "Você está com muito peso (%% kg)! Venda o que possui para continuar!", de: "Deine Lager ist voll (%% KG)! Verkaufe deinen Fisch um weiter zu machen!"},
    // JOB CATCHER
 
    // JOB FARMER
    "FARMER_CROP_BONUS": {en: "Crop Bonus", pt: "Bônus de Colheita", de: "Bonus"},
    "FARMER_BUTTON_PRESS": {en: "Start Harvesting", pt: "Iniciar Colheita", de: "Starte die Ernte"},
    "FARMER_BONUS_FAST": {en: "Speed Bonus", pt: "Bônus por Rapidez", de: "Geschwindigkeits-Bonus"},
    "FARMER_HARVEST_BEGINNING": {en: "Harvest Start Site", pt: "Ponto de Início da Colheita", de: "Start-Berich"},
    "FARMER_CENTER_FARM": {en: "Farm center", pt: "Centro da fazenda", de: "Mitte der Farm"},
    "FARMER_BACK_FARM": {en: "GET BACK TO THE FARM!", pt: "VOLTE PARA A FAZENDA!", de: "GEHE ZUR FARM ZURÜCK!"},
    "FARMER_BACK_TRACTOR": {en: "GET BACK TO THE TRACTOR!", pt: "VOLTE AO TRATOR!", de: "GEHE ZUM TRAKTOR ZURÜCK!"},
    "FARMER_QUITTED": {en: "You have lost your harvest!", pt: "Você perdeu sua colheita!", de: "DU hast deine Ernte verloren!"},
    "FARMER_TRACTOR": {en: "Tractor", pt: "Trator", de: "Traktor"},
    "FARMER_IN_BEGINNING": {en: "You are at the Starting of Harvest Site, type /start to start working.", pt: "Você está no ponto de Inicio da Colheita. Digite /start para trabalhar.", de: "DU bist an einem Start-Bereich, gib /start in den Chat ein um mit der Arbeit zu beginnen."},
    "FARMER_END": {en: "You finished the harvest and earn $ %% and %% XP!", pt: "Você terminou a colheita e ganhou $ %% e %% XP pelo serviço!", de: "Die Ernte ist beendet. Du hast $ %% und %% XP verdient!"},
    "FARMET_YET_HARVESTING": {en: "You are already working!", pt: "Você já está trabalhando!", de: "Du arbeitest schon!"},
    "FARMER_NOT_IN_BEGINNING": {en: "You are not at a Harvest Start Point!", pt: "Você não está em um Ponto de Início da Colheita!", de: "Du musst an einem Start-Bereich sine!"},
    "FARMER_NOT_IN_TRACTOR": {en: "You must be driving a Tractor!", pt: "Você precisa estar dirigindo um Trator!", de: "Du musst einen Trakto fahren!"},
    "FARMER_START": {en: "You started the harvest! Drive on the field to harvest, and keep an eye on the crop bonus!", pt: "Você começou a colheita! Dirija sobre o campo para colher, e fique de olho nos Bônus de Colheita!", de: "Du hast mit der Ernte begonnen, fahre entlang des Feldes und halte nach dem Bonus Ausschau!"},
    "FARMER_PERCENT_DONE": {en: "Harvest: %% KG / %%", pt: "Colheita: %% KG / %%", de: "Ernte: %% KG / %%"},
    "COMMANDS_DESCRIPTION_START": {en: "start the Harvest on the field", pt: "inicia a colheita no campo", de: "Starte die Ernte"},
    // JOB FARMER
 
    // JOB MECHANIC
    "MECHANIC_TURBOJUMP_ADDED": {en: "Turbo Jump added!", pt: "Adicionado Turbo Jump!", de: "Turbo Sprung hinzugefügt!"},
    "MECHANIC_NITRO_ADDED": {en: "Nitro added!", pt: "Adicionado Nitro!", de: "Nitro hinzugefügt!"},
    "MECHANIC_UNROLLED": {en: "Vehicle unrolled!", pt: "Veículo descapotado!", de: "Fahrzeug umgedreht!"},
    "MECHANIC_PAINTED": {en: "Vehicle painted!", pt: "Veículo pintado!", de: "Fahrzeug lackiert!"},
    "MECHANIC_REPAIRED": {en: "Vehicle repaired!", pt: "Veículo reparado!", de: "Fahrzeug repariert!"},
    "MECHANIC_ROLLOVER": {en: "Rollover the Vehicle", pt: "Descapotar o veículo", de: "Drehe das Farhzeug um"},
    "MECHANIC_ROLLOVER_DESCRIPTION": {en: "Rollover the Vehicle.", pt: "Descapotar o veículo.", de: "Drehe das Farhzeug um falls es einmal auf dem Dach liegt."},
    "MECHANIC_NOT_CLOSE_TO_VEHICLE": {en: "You are not close to any vehicle!", pt: "Você não está perto de nenhum veículo!", de: "Kein Fahrzeug ist in Rechweite!"},
    "MECHANIC_GOT_IN_VEHICLE": {en: "You got in the closest vehicle!", pt: "Você entrou no veículo mais próximo!", de: "Du bist in das nächste Fahrzeug eingestiegen!"},
    "MECHANIC_GETIN": {en: "Get in the closest vehicle", pt: "Entrar no veículo mais proximo", de: "Steige in das nächste Fahrzeug ein"},
    "MECHANIC_GETIN_DESCRIPTION": {en: "Get in the closest vehicle.", pt: "Entrar no veículo mais proximo.", de: "Steige in das nächste Fahrzeug ein falls es einmal auf den Dach liegt."},
    // JOB MECHANIC
 
    // JOB NEWS REPORTER
    "COMMANDS_DESCRIPTION_ANNOUNCE": {en: "create an announce to be advertised throughout Médici, including in the Newspaper", pt: "cria um anúncio para ser noticiado por toda Médici, incluindo nos Jornais", de: "Verfasse einen News-Artikel der in ganz Medici, sowie in der Zeitung erscheinen wird"},
    "COMMANDS_DESCRIPTION_ANNOUNCE_TEXT": {en: "text of announce", pt: "texto do anúncio", de: "News"},
 
    "NEWSREPORTER_CANT_ANNOUNCE_YET": {en: "You must wait to be able to announce again!", pt: "Você deve esperar para poder anunciar novamente!", de: "Warte ein wenig bis du wieder einen Artikel verfassen kannst!"},
    "NEWSREPORTER_CAN_ANNOUNCE_AGAIN": {en: "You can announce again!", pt: "Você já pode anunciar novamente!", de: "Du kannst wieder einen News-Artikel verfassen!"},
    // JOB NEWS REPORTER
 
    // JOB PARAMEDIC
    "PARAMEDIC_NEED_REVIVE": {en: "The player %% just died and needs a Paramedic! Go fast to the site!", pt: "O jogador %% acabou de morrer e precisa de um Paramedico! Vá rápido para o local!", de: "%% ist verletzt und bracht einen Sanitäter!"},
    "PARAMEDIC_EXPIRED_REVIVE": {en: "The player %% doesn't need a Paramedic anymore.", pt: "O jogador %% não precisa mais de um Paramedico.", de: "%% braucht keinen Sanitäter mehr."},
    "PARAMEDIC_NOT_DEATH": {en: "This player isn't dead!", pt: "Esse jogador não está morto!", de: "Dieser Spieler ist nicht tot!"},
    "PARAMEDIC_NOT_CLOSE": {en: "You are so far from this player!", pt: "Você está muito longe desse jogador!", de: "Der Spieler ist nicht in Reichweite!"},
    "PARAMEDIC_REVIVE_REVIVED": {en: "You revived the player %% and received $ %% and %% XP!", pt: "Você reviveu o jogador %% e recebeu $ %% e %% XP!", de: "Du hast %% behandelt und hast $ %% und %% XP verdient!"},
    "PARAMEDIC_HEAL_HEALED": {en: "The player %% accepted you heal and you earn $ %% and %% XP!", pt: "O jogador %% aceitou sua cura e você recebeu $ %% e %% XP!", de: "%% hat die Behandlung angenommen. Du hast $ %% und %% XP verdient!" },
    "PARAMEDIC_HEALED": {en: "You have been healed for $ %%!", pt: "Você foi curado e pagou $ %% ao paramedico!", de: "Du wurdest für $ %% behandelt!"},
    "PARAMEDIC_REQUEST_HEAL": {en: "The paramedic %% is offering you healing for $ %%!", pt: "O paramédico %% está te oferecendo cura por $ %%!", de: "Der Sanitäter %% bietet dir eine Behandlung für $ %% an!"},
    "PARAMEDIC_REQUEST_OFFERED_HEAL": {en: "You offered healing to %% for $ %%! Stay close!", pt: "Você ofereceu a cura para %% por $ %%! Fique perto!", de: "Du hast %% eine behandlung für $ %% angeboten. Bleib in Reichweite!"},
	"PARAMEDIC_HEAL_DECLINED": {en: "The player %% declined you heal!", pt: "O jogador %% recusou sua cura!", de: "%% hat die Behandlung abgelehnt!"},
 
    "COMMANDS_DESCRIPTION_REVIVE": {en: "<span class='command'>DEPRECATED</span> revives a player", pt: "<span class='command'>DEPRECATED</span> revive um jogador", de: "<span class='command'>DEPRECATED</span> Behandelt einen Spieler (schwere Verletzung)"},
	"COMMANDS_DESCRIPTION_HEAL": {en: "<span class='command'>DEPRECATED</span> heals a player", pt: "<span class='command'>DEPRECATED</span> cura um jogador", de: "<span class='command'>DEPRECATED</span> Behandelt einen Spieler"},
	
    "CONTEXT_MENU_JOB_PARAMEDIC_REVIVE": {en: "Revive", pt: "Reviver", de: "Wiederbeleben"},
    "CONTEXT_MENU_JOB_PARAMEDIC_HEAL": {en: "Offer Heal", pt: "Oferecer Cura", de: "Heilen"},
    // JOB PARAMEDIC
 
    // POLICE
    "WANTEDSTAR_NAME_1": {en: "Ilegal Weapon Carry", pt: "Porte Ilegal de Armas", de: "Illegales Führen einer Waffe"},
    "WANTEDSTAR_NAME_2": {en: "Murder", pt: "Assassinato", de: "Mord"},
    "WANTEDSTAR_NAME_3": {en: "Not Carrying License", pt: "Direção sem Habilitação", de: "Fahren ohne FührerscheinS"},
    "WANTEDSTAR_NAME_4": {en: "Speeding", pt: "Excesso de Velocidade", de: "Zu schnelles Fahren"},
    "WANTEDSTAR_NAME_5": {en: "Theft Auto", pt: "Roubo de Veículo", de: "Autodiebstahl"},
    "WANTEDSTAR_NAME_6": {en: "Illegal Fishing", pt: "Pesca Ilegal", de: "Illegales Fischen"},
    "WANTEDSTAR_NAME_7": {en: "Terrorism", pt: "Terrorismo", de: "Terrosismus"},
    "WANTEDSTAR_NAME_8": {en: "Attempted Murder", pt: "Tentatíva de Homicídio", de: "Versuchter Mord"},
    "WANTEDSTAR_NAME_9": {en: "Police Resistance", pt: "Resistência à Policia", de: "Wiedersetzen der Polizei"},
 
    "POLICE_PRISON": {en: "Prison", pt: "Cadeia", de: "Gefängnis"},
    "POLICE_ARRESTED": {en: "ARRESTED!", pt: "PRESO!", de: "GEFANGEN!"},
    "POLICE_HANDCUFFED": {en: "HANDCUFFED!", pt: "ALGEMADO!", de: "FESTGEHALTEN!"},
    "POLICE_HALT": {en: "[#e74c3c]HALT!", pt: "[#e74c3c]PARADO!", de: "[#e74c3c]STOP!"},
    "POLICE_UNCUFFED": {en: "Uncuffed!", pt: "Desalgemado!", de: "Du wurdest freigelassen"},
    "POLICE_YOU_ARE_BEING_INSPECTED_BY": {en: "You are being inspected by %%!", pt: "Você está sendo revistado por %%!", de: "Du wirst von %% untersucht!"},
    "POLICE_YOU_HAVE_BEEN_HALTED_BY": {en: "The policeman %% is ordering you to stop immediately!", pt: "O policial %% está mandando você parar imediatamente!", de: "Der Polizist %% verlangt dass du anhälst!"},
    "POLICE_YOU_HAVE_BEEN_HANDCUFFED_BY": {en: "You have been handcuffed by %%!", pt: "Você foi algemado por %%!", de: "Du wirst von dem Polizist %% festgehalten!"},
    "POLICE_YOU_HAVE_BEEN_HANDCUFFEDCAR_BY": {en: "You have been handcuffed and put into the Police Car by %%!", pt: "Você foi algemado e colocado dentro da Viatura por %%!", de: "Der Polizist %% hat dich in das Polizeifahrzeug gebracht!"},
    "POLICE_YOU_HAVE_BEEN_UNCUFFED_BY": {en: "You have been unshackled by %%!", pt: "Você foi desalgemado por %%!", de: "Du wurdest von %% freigelassen!"},
    "POLICE_YOU_HAVE_BEEN_UNCUFFED": {en: "You have been unshackled!", pt: "Você foi desalgemado!", de: "Du wurdest freigelassen!"},
    "POLICE_ARRESTED_BY": {en: "You have been arrested by %% and your weapons were confiscated!", pt: "Você foi preso por %% e suas armas foram confiscadas!", de: "Du wurdest ins Gefängnis gebracht und deine Waffen wurden konfisziert!"},
    "POLICE_ARRESTED_COST": {en: "You had to pay $ %% for your Wanted Stars!", pt: "Você teve que pagar $ %% pelas suas Estrelas de Procurado!", de: "Du musstest $ %% für deine Straftaten bezahlen!"},
 
    "POLICE_DONT_TRY_TO_ESCAPE": {en: "Don't try to escape from the Prison!", pt: "Não tente fugir da Prisão!", de: "Versuch nicht aus dem Gefängnis zu flüchten!"},
    "POLICE_YOU_ARE_FREE": {en: "FREEDOM!", pt: "LIBERDADE!", de: "FREIHEIT!"},
    "POLICE_SUSPECT_BY": {en: "Suspect by", pt: "Suspeito de", de: "Verdächtigt von"},
    "POLICE_INVALID_SUSPECT": {en: "Invalid type (valid: %%)", pt: "Motivo inválido (válidos: %%)", de: "Ungültiger Typ (gültig: %%)"},
 
    "POLICE_STOLEN_VEHICLE": {en: "Stolen Vehicle", pt: "Veículo Roubado", de: "Gestohlenes Fahrzeug"},
    "POLICE_YOU_HAVE_BEEN_STOLEN": {en: "You had your vehicle stolen, to call the police type /911 theftauto!", pt: "Você teve seu veículo roubado, para chamar a policia e denunciar, digite: /911 theftauto!", de: "Dein Fahrzeug wurde gestohlen! Um die Polizeu zu rufen, gib /911 theftautoo im Chat ein!"},
    "POLICE_YOU_HAVE_NOTHING_TO_DENOUNCE": {en: "You have nothing to denounce!", pt: "Você não tem nada para denunciar!", de: "Du hast nichts zum anzeigen!"},
	"POLICE_YOU_HAVE_DENOUNCED": {en: "You have denounced %% for %%!", pt: "Você denunciou %% por %%!", de: "Du hast %% für %% angezeigt!"},
	
    "POLICE_NOT_CLOSE_TO_VEHICLE": {en: "You are not close to any police car!", pt: "Você não está perto de nenhum veículo policial!", de: "Kein Polizeifahrzeug ist in Rechweite!"},
 
    "COMMANDS_DESCRIPTION_911": {en: "call the Police", pt: "chama a Policia", de: "Rufe die Polizei"},
    "COMMANDS_DESCRIPTION_911_THEFTAUTO": {en: "denounce an assault on your vehicle", pt: "denuncia um assalto a seu veículo", de: "Zeige einen Angriff auf dein Fahrzeug an"},
    "COMMANDS_DESCRIPTION_911_TERRORISM": {en: "denounce a player for terrorism", pt: "denuncia um jogador por terrorismo", de: "Zeige einen Spieler für Terrorismus an"},
    "COMMANDS_DESCRIPTION_911_ATTEMPTEDMURDER": {en: "denounce a player for attempted murder", pt: "denuncia um jogador por tentativa de homicídio", de: "Zeige einen Spieler für versuchten Mord an"},
    "COMMANDS_DESCRIPTION_911_RESISTANCE": {en: "denounce a player for resistence to police order", pt: "denuncia um jogador por resistência à ordem policial", de: "Zeige einen Spieler fürs Wiedersetzen der Polizei an"},
    // POLICE
 
    // JOB POLICE
    "CONTEXT_MENU_JOB_POLICE_INSPECT": {en: "Inspect", pt: "Inspecionar", de: "Überprüfen"},
    "CONTEXT_MENU_JOB_POLICE_CUFF": {en: "Handcuff", pt: "Algemar", de: "Handschellen"},
    "CONTEXT_MENU_JOB_POLICE_CUFFCAR": {en: "Handcuff into the Police Car", pt: "Algemar no Veiculo Policial", de: "Handschellen im Polizeifahrzeug"},
    "CONTEXT_MENU_JOB_POLICE_UNCUFF": {en: "Unshackle", pt: "Desalgemar", de: "Unwucht"},

    "POLICE_INSPECTION": {en: "Inspection", pt: "Inspeção", de: "Überprüfung"},
    "POLICE_INSPECT_REQUESTED": {en: "You are requesting to inspect the player %%.", pt: "Você está requisitando inspecionar o jogador %%.", de: "Du verlangst %% überprüfen zu dürfen"},
    "POLICE_REQUEST_INSPECT": {en: "The policeman %% is requesting to inspect you. Accept or an arrest warrant may be issued.", pt: "O policial %% está requisitando inspecionar você. Aceite ou poderá ser dada ordem de prisão.", de: "Der Polizist %% verlangt eine Überprüfung durchführen zu dürfen."},
    "POLICE_INSPECT_DECLINED": {en: "The player %% refuses to be inspected by you.", pt: "O jogador %% se recusa ser inspecionado por você.", de: "%% lehnte die Überprüfung ab."},
 
    "POLICE_HALT_SENT": {en: "You halted the player %%!", pt: "Você deu ordem de parada para o jogador %%!", de: "Du hast %% angehalten!"},
 
    "POLICE_SUSPECT": {en: "Suspect", pt: "Suspeito", de: "Verdächtigt"},
    "POLICE_WANTED": {en: "Wanted", pt: "Procurado", de: "Gesucht"},
 
    "POLICE_PLAYER_NOT_SUSPECT": {en: "This player isn't suspect of that!", pt: "Esse jogador não é suspeito disso!", de: "Dieser Spieler ist dafür nicht verdächtigt!"},
    "POLICE_NOT_IN_POLICE_CAR": {en: "You must be in a police car!", pt: "Você deve estar em uma viatura da policia!", de: "Du musst ein Polizeiauto fahren!"},
    "POLICEDEPARTMENT_NOT_IN": {en: "You must be in a Police Department!", pt: "Você deve estar em um Departamento de Policia!", de: "Du musst am Revier sein!"},
    "POLICE_YOU_HAVE_BEEN_EQUIPPED": {en: "You have been equipped, use your weapons wisely!", pt: "Você foi equipado, use suas armas com sabedoria!", de: "Du wurdest ausgerüstet, verwende deine Waffen weise!"},
    "POLICE_CHANGED_JOB": {en: "You stopped being a Police and your weapons were returned!", pt: "Você deixou de ser Policial e suas armas foram devolvidas!", de: "Du hast die Polizei verlassen und gabst deine Waffen zurück!"},
 
    "POLICE_HEALTH": {en: "Health", pt: "Plano de Saúde", de: "Gesundheit"},
    "POLICE_LIFE": {en: "Life", pt: "Vida", de: "Leben"},
    "POLICE_CAR": {en: "Car", pt: "Carro", de: "Auto"},
    "POLICE_BIKE": {en: "Bike", pt: "Moto", de: "Motorrad"},
    "POLICE_HELI": {en: "Heli", pt: "Heli", de: "Helikopter"},
    "POLICE_PLANE": {en: "Plane", pt: "Avião", de: "Flupgzeug"},
    "POLICE_SEA": {en: "Sea", pt: "Maritma", de: "Wasserfahrzeuge"},
 
    "POLICE_INSPECTION_NAME": {en: "Name", pt: "Nome", de: "Name"},
    "POLICE_INSPECTION_JOB": {en: "Job", pt: "Emprego", de: "Beruf"},
    "POLICE_INSPECTION_LICENSES": {en: "Licenses", pt: "Habilitações", de: "Führerscheine"},
    "POLICE_INSPECTION_INSURANCES": {en: "Insurances", pt: "Seguros", de: "Versicherungen"},
    "POLICE_INSPECTION_WEAPONS": {en: "Carrying weapons", pt: "Portando armas", de: "Führt Waffen"},
    "POLICE_INSPECTION_WEAPONCARRYPERMIT": {en: "Weapon Carry Permit", pt: "Licensa de Porte de Armas", de: "Waffenschein"},
    "POLICE_INSPECTION_WANTED": {en: "Wanted", pt: "Procurado", de: "Gesucht"},
 
    "POLICE_UNARRESTED": {en: "This player does not have enough Wanted Stars to be arrested!", pt: "Este jogador possui Estrelas de Procurado suficiente para poder ser preso!", de: "Dieser Spieler hat zu wenig Straftaten begangen um ins Gefängnis zu kommen!"},
    "POLICE_ARRESTED_PLAYER": {en: "You arrested %% and earned $ %% and %% XP!", pt: "Você prendeu %% e recebeu $ %% e %% XP!", de: "Du hast %% ins Gefängnis geschickt und verdiesntest $ %% und %% XP!"},
    "POLICE_UNCUFFED_PLAYER": {en: "You unshackled %%!", pt: "Você desalgemou %%!", de: "Du hälst %% nicht mehr fest!"},
    "POLICE_CUFFED_PLAYER": {en: "You have been cuffed %% for 120 seconds!", pt: "Você algemou %% por 120 segundos!", de: "Du wirst für 120 Sekunden festgehalten"},
    "POLICE_CUFFEDCAR_PLAYER": {en: "You have been handcuffed %% and put them into the your Car!", pt: "Você algemou %% e o colocou dentro de sua viatura!", de: "Du wurdest in das Polizeifahrzeug gebracht!"},
 
    "COMMANDS_DESCRIPTION_SUSPECT": {en: "Confirms suspicion to a player and gives him Wanted Stars.<br>Valid Reasons: 'terrorism / attemptedmurder'.", pt: "Confirma a suspeita a um jogador e o dá Estrelas de Procurado.<br>Motivos Válidos: 'terrorism / attemptedmurder'.", de: "Bestätight eine Verdächtigung und trägt die Straftat ein.<br>Valid Reasons: 'terrorism / attemptedmurder'"},
    "COMMANDS_DESCRIPTION_SUSPECT_TYPE": {en: "reason", pt: "motivo", de: "Grund"},
    "COMMANDS_DESCRIPTION_CUFF": {en: "<span class='command'>DEPRECATED</span> Handcuff a player for 120 seconds.", pt: "Algema um jogador por 120 segundos.", de: "Hält einen Spieler für 120 Sekuden fest."},
    "COMMANDS_DESCRIPTION_UNCUFF": {en: "<span class='command'>DEPRECATED</span> Unshackle a player.", pt: "Desalgema um jogador.", de: "Lasse einen Spieler frei."},
    "COMMANDS_DESCRIPTION_HALT": {en: "Orders a player to halt.", pt: "Ordena um jogador para parar.", de: "Verlange dass ein Spieler anhält."},
    "COMMANDS_DESCRIPTION_PATROL": {en: "Starts a patrol to maintain order in the cities.", pt: "Inicia uma patrulha para manter a ordem nas cidades.", de: "started die Patruillie um Ordnung zu halten"},
    "COMMANDS_DESCRIPTION_ARREST": {en: "Arrests a player who has more than 1 Wanted Star, being at the Police Department.", pt: "Prende um jogador que possua mais de 1 Estrela de Procurado, estando no Departamento de Polícia.", de: "Verhafte einen Spieler mit mehr als einer Straftat am Polizeirevier"},
    "COMMANDS_DESCRIPTION_INSPECT": {en: "<span class='command'>DEPRECATED</span> Inspects a player to see if he is carrying anything illegal or is Wanted by police.", pt: "Revista um jogador para ver se está portando algo ilegal ou se é procurado pela policia.", de: "Überprüfe einen Spieler auf Straftaten."},
	// JOB POLICE
	
	// JOB BAVARIUM ARCHEOLOGIST
    "BAVARIUMARCHEOLOGIST_MAGNETIC_DETECTOR": {en: "Magnetic Detector", pt: "Detector Magnético", de: "Magnetsensor"},
    "BAVARIUMARCHEOLOGIST_PERCENT_CLOSE": {en: "Magnetic Detector: %%%", pt: "Detector Magnético: %%%", de: "Magnetsensor: %%%"},
    "BAVARIUMARCHEOLOGIST_START": {en: "Turns on the Magnetic Detector", pt: "Ligar o Detector Magnético", de: "Schaltet den Magnetsensor an"},
    "BAVARIUMARCHEOLOGIST_START_DESCRIPTION": {en: "Displays and turns on the Magnetic Detector proximity to search for Bavarium Relics.", pt: "Ligar o Detector Magnético para buscar por Relíquias de Bavarium na região.", de: "Zeigt die Rechweite des Magnetsenseros an und achaltet sie ein um nacj Bavarium-Relikten zu suchen."},
    "BAVARIUMARCHEOLOGIST_STOP": {en: "Turns off the Magnetic Detector", pt: "Desligar o Detector Magnético", de: "Schaltet den Magnetsensor aus"},
    "BAVARIUMARCHEOLOGIST_STOP_DESCRIPTION": {en: "Turns the Magnetic Detector OFF to search for Bavarium Relics in the region.", pt: "Desligar o Detector Magnético para buscar por Relíquias de Bavarium na região.", de: "Schaltet den Magnetsensor aus um nach Relikten in der Umgebung zu suchen."},
    "BAVARIUMARCHEOLOGIST_BUTTON_PRESS": {en: "Start Digging", pt: "Iniciar Escavação", de: "Fange an zu graben"},
    "BAVARIUMARCHEOLOGIST_DIGGING": {en: "Digging", pt: "Escavando", de: "Graben"},
    "BAVARIUMARCHEOLOGIST_BAVARIUM_SITE": {en: "Bavarium Relic", pt: "Relíquia de Bavarium", de: "Bavarium-Relikt"},
    "BAVARIUMARCHEOLOGIST_BAVARIUM_CATCHED": {en: "Good job! You were able to dig a total of %% KG into Bavarium Relics!", pt: "Bom Trabalho! Você conseguiu escavar um total de %% KG em Relíquias de Bavarium!", de: "Gute Arbeit! Du hast insgesamt %%KG an Bavarium-Relikten ausgegraben! "},
    "BAVARIUMARCHEOLOGIST_SELLING_POINT_MY_CATCHES": {en: "My Bavarium Relics", pt: "Minhas Relíquias de Bavarium", de: "Meine Bavarium-Relikte"},
    "BAVARIUMARCHEOLOGIST_SELLING_POINT_SELL_CATCHES": {en: "Sell Bavarium Relics", pt: "Vender Relíquias de Bavarium", de: "Verkaufe Bavarium-Relikte"},
    "BAVARIUMARCHEOLOGIST_SELLING_POINT_SOLD_ALL_CATCHES": {en: "You have sold all your Bavarium Relics!", pt: "Você vendeu todas suas Relíquias de Bavarium!", de: "Du hast alle deine Bavarium-Relikte verkauft!"},
    "BAVARIUMARCHEOLOGIST_EQUIPAMENT": {en: "My Magnetic Detector", pt: "Meu Detector Magnético", de: "Meine Magnetsensor"},
    "BAVARIUMARCHEOLOGIST_EQUIPAMENT_DESCRIPTION": {en: "Your current equipment is: %%. You can upgrade it at The Bavarium Museum!", pt: "Seu equipamento atual é: %%. Você pode atualizá-lo na The Bavarium Museum!", de: "Ihre aktuelle Ausrüstung ist: %%. Sie können es im The Bavarium Museum upgraden!"},
    "BAVARIUMARCHEOLOGIST_SELLING_POINT_UPGRADE": {en: "Upgrade Magnetic Detector", pt: "Atualizar Detector Magnético.", de: "Verbessere den Magnetsensor."},
    "BAVARIUMARCHEOLOGIST_SELLING_POINT_UPGRADE_DESCRIPTION": {en: "Upgrade your Magnetic Detector to %%.", pt: "Atualize seu Detector Magnético para %%.", de: "Verbessere deinen Magnetsensor zu %%."},
    "BAVARIUMARCHEOLOGIST_SELLING_POINT_CANT_UPGRADE_DESCRIPTION": {en: "Your Magnetic Detector is already maxed.", pt: "O seu Detector Magnético já está maximizado.", de: "Dein Magnetsensor ist bereits maximal verbessert."},
    "BAVARIUMARCHEOLOGIST_SELLING_POINT_UPGRADED": {en: "You have upgraded your Magnetic Detector to %%!", pt: "Você atualizou o seu Detector Magnético para %%!", de: "Du hast deinen Magnetsensor zu %% verbessert!"},
    // JOB BAVARIUM ARCHEOLOGIST
 
    // JOBS
    "COMMANDS_JOB_HELP_LABEL": {en: "~~~~~~~~ Commands of %% ~~~~~~~~", pt: "~~~~~~~ Comandos de %% ~~~~~~~", de: "~~~~~~~~ Commands von %% ~~~~~~~~"},
    "COMMANDS_JOB_HELP_NO_COMMANDS": {en: "You job has no commands!", pt: "Seu emprego não possui comandos!", de: "Dein Beruf hat keine Commands!"},
 
    "JOBTYPE_NAME_1": {en: "Civilians", pt: "Civís", de: "Bürger"},
    "JOBTYPE_NAME_2": {en: "Military", pt: "Militares", de: "Militär"},
    "JOBTYPE_NAME_3": {en: "Rebels", pt: "Rebeldes", de: "Rebellen"},
 
    "JOB_NAME_1": {en: "Unemployed", pt: "Desempregado", de: "Arbeitslos"},
    "JOB_NAME_2": {en: "Truck Driver", pt: "Caminhoneiro", de: "Truckfahrer"},
    "JOB_NAME_3": {en: "Mechanic", pt: "Mecânico", de: "Mechaniker"},
    "JOB_NAME_4": {en: "Paramedic", pt: "Paramédico", de: "Sanitäter"},
    "JOB_NAME_5": {en: "News Reporter", pt: "Jornalista", de: "Reporter"},
    "JOB_NAME_6": {en: "Farmer", pt: "Agricultor", de: "Farmer"},
    "JOB_NAME_7": {en: "Police", pt: "Policial", de: "Polizist"},
    "JOB_NAME_8": {en: "Fisherman", pt: "Pescador", de: "Fischer"},
    "JOB_NAME_9": {en: "Hunter", pt: "Caçador", de: "Jäger"},
    "JOB_NAME_10": {en: "Pizza Delivery", pt: "Entregador de Pizza", de: "Pizza-Lieferant"},
    "JOB_NAME_11": {en: "Bus Driver", pt: "Motorista de Ônibus", de: "Busfahrer"},
    "JOB_NAME_12": {en: "Taxi Driver", pt: "Taxista", de: "Taxifarher"},
    "JOB_NAME_13": {en: "Military Soldier", pt: "Soldado Militar", de: "Soldat"},
    "JOB_NAME_14": {en: "Rebel Mercenary", pt: "Mercenário Rebelde", de: "Rebell"},
    "JOB_NAME_15": {en: "Lawyer", pt: "Advogado", de: "Anwalt"},	
    "JOB_NAME_16": {en: "Heli Taxi Driver", pt: "Taxista Aéreo", de: "Heli-Taxifahrer"},
    "JOB_NAME_17": {en: "Agricultural Pilot", pt: "Piloto Agrícola", de: "Landwirtschaftlicher Pilot"},
    "JOB_NAME_18": {en: "Race Designer", pt: "Designer de Corridas", de: "Renn-Designer"},
    "JOB_NAME_19": {en: "Tank Truck Driver", pt: "Motorista de Caminhão Pipa", de: "Benzin-Truckfahrer"},
    "JOB_NAME_20": {en: "Bavarium Archeologist", pt: "Arqueólogo de Bavarium", de: "Bavarium-Archäologe"},
 
    "JOB_DESCRIPTION_1": {en: "Guaranteed minimum pay means all the other people get more money, but you have lots of free time.", pt: "Salário Mínimo signfiica que todas outras pessoas ganham mais dinheiro, porém você tem muito tempo livre.", de: "Hier bekommst du zwar geld, aber nur den Midestlohn. Das bedeutet allerdings viel Freizeit."},
    "JOB_DESCRIPTION_2": {en: "Make Bavarium deliveries to bases, keeping your cargo safe and your country safer… sort of.", pt: "Faça entregas de Bavarium às bases militares, mantendo sua carga segura e seu país mais seguro... ou tipo isso.", de: "Liefere Bavarium zu Militärbasen um die Wirtschaft aufrecht zu erhalten."},
    "JOB_DESCRIPTION_3": {en: "Keep the vehicles of Médici in good repair (rubber side down) and painted as well. Or maybe customize them to sell?", pt: "Mantenha os veículo de Médici em bom estado e bem pintada. Ou talvez customizá-los para vender?", de: "Halte die Fahrzeuge von Medici in schuss und verbesser sie!"},
    "JOB_DESCRIPTION_4": {en: "The health and even life of Médici’s citizens are in your hands! Be ready to heal and revive them!", pt: "A saúde e a vida dos cidadãos de Médici estão em suas mãos! Esteja pronto para curá-los e revivê-los!", de: "Das Leben und die Sicherheit Medicis Bürger liegt in deinen Händen. Versorge Medicis Bürger um ihre Sicherheit zu gewährleisten!"},
    "JOB_DESCRIPTION_5": {en: "No news is good news? BALDERDASH! Your job is to keep up a constant stream of updates on what is happening in Médici, whatever it may be.", pt: "Nenhuma notícia é boa notícia? BESTEIRA! Seu trabalho é manter um fluxo constante de atualizações sobre o que está acontecendo em Médici, seja lá o que for.", de: "Dir fehlen spannende News? Dann ist dies der Beruf für dich! Berichte über spannende und interessante Ereignisse rund um Medici!"},
    "JOB_DESCRIPTION_6": {en: "Harvest crops to feed the populace of Médici, increase the economy, and be a hero of the people!", pt: "Colhe colheitas que irão alimentar a população de Médici, aumentando a economia e seja um Herois para as pessoas!", de: "Kümmere dich um Medicis Felder und stelle sicher dass es genug Weizen für die Bevölkerung gibt!"},
    "JOB_DESCRIPTION_7": {en: "Keep Médici safe by patrolling her towns, arresting criminals, and resolving disputes without violence. Challenging, isn't it?", pt: "Mantenha Médici segura, patrulhando suas cidades, prendendo criminosos  resolvendo disputas sem violência. Desafiador, não é?", de: "Sichere Medicis Frieden durch Streife-Fahrten durch die Dörfer und das einfangen von Kriminellen!"},
    "JOB_DESCRIPTION_8": {en: "Médici does not live by sunflower seeds and wild game alone...Go fishing just for the halibut! … and to feed the multitudes ashore.", pt: "Médici não vive com sementes de girassol e sozinhos jogos selvagens... Vá pescar apenas pelo alabote! ... e alimentar as multidões em terra firme.", de: "Die Bürger Medicis werden nicht nur durch Brot satt, also sorge für Abwechslung und versorge sie mit Fischen!"},
    "JOB_DESCRIPTION_9": {en: "Do you like lurking outdoors? (Well, near the outdoors anyway). You can cash in by hunting and trapping wild game and selling to a hungry Médici.", pt: "Você gosta de ficar a espreita ao ar livre? (Bem, perto do ar livre de qualquer maneira). Você pode ganhar dinheiro ao caçar animais selvagens e vender para um Médici faminto.", de: "Bist du gerne in der Wildnis? Dann ist dies der Beruf für dich! Jage Wild und versorge die Bevölkerung damit!"},
    "JOB_DESCRIPTION_10": {en: "Médici defies culinary expectations by demands for incredible quantities of pizza. Quell the ravening hordes with stuffed crust, deep-dish, or traditional thin deliveries!", pt: "Médici desafia as expectativas culinárias por exigências de incríveis quantidades de pizza. Acalme as hordas famintas com borda recheada, massa grossa, ou entregas finas tradicionais!", de: "Versorge die Haushalte rund um Medici mit den verschiedensten Variationen an Pizza."},
    "JOB_DESCRIPTION_11": {en: "Surely all the buses in Médici can’t be Out Of Service? Guess again! Drive around the bus routes to check whether they are ready for use, and ignore those grubby potential passengers right and left.", pt: "Com certeza os ônibus em Médici não podem ficar fora do serviço! Dirija os itinerários de ônibus para transportar os passageiros por Médici!", de: "Fahre entlang Medicis Buslinien um für eine komfortable Mitfahrgelegenheit zu sorgen!"},
    "JOB_DESCRIPTION_12": {en: "Give people of Médici a lift in their life, and get paid for it! The more scenic the route the more you get paid, and your passengers will love you for it, I’m sure!", pt: "Dê às pessoas de Médici um ajudinha em suas vidas, e seja pago por isso! Quanto mais cênica a rota, mais você será pago, e seus passageiros vão te amar por isso, tenho certeza!", de: "Als Taxifahrer kannst du von anderen Spielern zu ihrer Position gerufen werden, sie abholen und gegen Bezahlung an ihr Ziel bringen."},
    "JOB_DESCRIPTION_13": {en: "The Fortias Armate Médicense are the official military of Médici. Their duties include national defense, protecting military bases and suppressing the rebellion.", pt: "As Fortias Armate Médicense são os oficiais militares de Médici. Os seus deveres incluem a defesa nacional, a proteção das bases militares e a supressão da rebelião.", de: "Die Aufgabe von Medicis Militär ist es Die Inselgruppe zu beschützen, Militärbasen zu verteidigen und gegen die Rebellion zu kämpfen."},
    "JOB_DESCRIPTION_14": {en: "You have heard the cry of the people for freedom and responded with your blood, your sweat, your tears and probably other body fluids we shouldn’t really go into here. Your duties are essentially to attack the military bases.", pt: "Você ouviu o grito das pessoas pela liberdade e respondeu com seu sangue, seu suor, suas lágrimas e provavelmente outros fluidos corporais que não devemos realmente expor aqui. Suas funções são essencialmente atacar as bases militares.", de: "Du möchtest dem Volk helfen gegen das Unterdrückende Militär zu kämpfen? Dann verbünde dich mit den Rebellen und hilf ihnen großen Schaden durch die Übernahme von Militärbasen zu verursachen!"},
    "JOB_DESCRIPTION_15": {en: "Help those in Jail in Médici get out sooner… for a reasonable fee, of course! Petition for early release!", pt: "Ajude aqueles que estão na prisão de Médici a sairem mais cedo... por uma taxa razoável, é claro! Petição para liberdade antecipada!", de: "Hilf anderen Spielern im Gefängnis schneller frei zu kommen, natürlich mit guter Bezahlung."},
    "JOB_DESCRIPTION_16": {en: "Now give people of Médici a real lift in their life by Heli, and get paid for it! The more scenic the route the more you get paid, and your passengers will love you for it, I’m sure!", pt: "Agora, dê às pessoas de Médici um verdadeiro impulso em sua vida por Helicopteros, e seja pago por isso! Quanto mais cênica a rota, mais você será pago, e seus passageiros vão te amar por isso, tenho certeza!", de: "Dein Job ist es Bewohnern von Medici eine Taxifahrt der Extraklasse zu bieten indem du sie per Helikopter ans Ziel bringst!"},
    "JOB_DESCRIPTION_17": {en: "Cruise the skies over Médici crops and apply herbicide, pesticide, and fertilizer to them as needed! Stunt flying actively encouraged!", pt: "Atravesse os céus sobre as fazendas de Médici e despeje herbicidas, pesticidas e fertilizantes, conforme necessário!", de: "Fliege über die Felder von Medici und sprühe dünger über die Felder damit sie mehr und schnelleren Ertrag bringen!"},
    "JOB_DESCRIPTION_18": {en: "Do you like making people run around in circles, or sometimes just all over the place? Define new Race courses for the entertainment of all, but particularly yourself!", pt: "Você gosta de fazer as pessoas correrem em círculos, ou às vezes apenas em todo o lugar? Defina novas pistas de corrida para o entretenimento de todos, mas particularmente para o seu próprio!", de: "Lebe deine Kreativität voll aus indem du eigene Rennen erstellst und sie der Öffentlichkeit zur Verfügung stellst und alle unterhalten kannst!"},
    "JOB_DESCRIPTION_19": {en: "It's a tankless job, but someone has to deliver barrels of Gas to the Gas Stations all over Medici. Drive friendly now, OK?", pt: "É um trabalho sem tanque, mas alguém tem que entregar barris de gasolina para os postos de em toda a Medici. Dirija amigavelmente agora, ok?", de: "Beliefere die Tankstellen Medicis mit Benzin, gib jedoch auch deinen Fahrstil acht!"},
    "JOB_DESCRIPTION_20": {en: "Bavarium artefacts buried long ago are popping up. You will track them down and dig them up for valuable cash prizes at the Bavarium Museum.", pt: "Reliquias de Bavarium eterradas há muito tempo estão surgindo. Você vai encontrá-los e desenterrá-los para valiosos prêmios em dinheiro no Museu do Bavarium.", de: "Bavarium-Relikte die vor langer Zeit vergraben wurden, tauchen wieder. auf. Deine Aufgabe ist es diese zu finden und aus zu graben da sie am Bavarium-Musem hohe Preise erzielen."},
 
    "JOB_TUTORIAL_1": {en: "Out of work? Look for it (the Town Hall is a great place for that), or do what you like… It’s a free country,  sort of.", pt: "Sem emprego? Procure por um (a Prefeitura é um bom lugar para isso), ou faça o que você gosta... É um pais livre, ou quase isso.", de: "Du brachst einen Beruf? Dann Besuche das Rathaus, den idealen Ort für dieses Gebiet!"},
    "JOB_TUTORIAL_2": {en: "Get a truck and go to the Bavarium Loading site, then hold F to load your Truck. Look for your assigned delivery spot marker and drive there to do unload your Bavarium to the Military Base. Hint: Nitro helps.", pt: "Suba em um caminhão e vá para o Ponto de Carregamento de Bavarium, então segure F para carregar seu caminhão. Então vá para o ponto de descarregamento que foi atribuido à você para descarregar o Bavarium para a Base Militar. Dica: Nitro vai dar uma ajudinha.", de: "Steige in einen Truck und Lade Bavarium am Ladepunkt und enlade es an deinem Zielpunkt! Tip: Nitro hilft!"},
    "JOB_TUTORIAL_3": {en: "While sitting in a vehicle, you can paint it (learn color codes from PayNSpray), repair it, or in case of unplanned inversion roll it upright once again.", pt: "Enquanto estiver em um veículo, você pode pintá-lo (aprenda os códigos de cores em um Pay'n Spray), repará-lo ou, em caso de capotamento não planejado, descapotá-lo.", de: "Wenn du in einem Fahrzeug sitzt, kannst du es lackieren, reparieren oder sogar umdrhen!"},
    "JOB_TUTORIAL_4": {en: "Stand close to the afflicted person, and use /heal or /revive as needed. Note the player id number from playerlist may be helpful for those also afflicted with creative spelling.", pt: "Fique perto do jogador, e use /heal ou /revive conforme necessário. Observe que o ID do jogador da lista de jogadores pode ser útil para aqueles jogadores com a ortografia criativa.", de: "Hilf Spielern indem du nahe ihnen die Commands /heal und /revive verwendest Tip: Verwende die ID anstatt dem Namen falls du den Namen nicht eingeben kannst."},
    "JOB_TUTORIAL_5": {en: "Use the official News Helis or Propaganda Vans to go about Médici collecting information, and then share it with /announce.", pt: "Use os Helicópteros oficiais de Notícias ou Vans de Propaganda para viajar por Médici coletando informações e depois compartilhá-las com /announce.", de: "Verwende die ofiziellen Propaganda-Vans und News-Helikopter um die besten News mit /announce publik zu machen!"},
    "JOB_TUTORIAL_6": {en: "Driving a tractor, look for a Starting of Harvest site and press F when there to begin. Cover the field as quickly as possible to complete the task. Hint: Nitro helps.", pt: "Colhe colheitas que irão alimentar a população de Médici, aumentando a economia e seja um Herois para as pessoas!", de: "Fahre einen Traktor und drücke F an einer Start-Position und Farme Weizen so schnell wie möglich! Tip: Nitro hilft."},
    "JOB_TUTORIAL_7": {en: "Use the official Police Cars to do patrols, and if necessary inspect suspicious citizens, and cuff Wanted ones, taking them to Jail to arrest.", pt: "Use um veículo oficial da Policia para fazer patrulhas, e se necessário reviste civís suspeitos e algeme os procurados, levando-os para a Cadeia para prendê-los.", de: "Verwende Polizeifahrzeuge um auf Streife zu gehen, verdächtige Spieler züberprüfen und Straftäter zu verhaften."},
    "JOB_TUTORIAL_8": {en: "Take a boat out from the Fisherman docks to the Fishing Spot sites (the further the better), and hold F to start fishing. (Use the anchor to stabilize your boat). Once your have caught your limit, go to Selling Site and use F menu to sell your catch. WARNING: Rumors of a mythical Illegal Fishing Spotshould be ignored! Illegal Fishing can give you Wanted stars and make you subject to arrest! Resist the temptation no matter the illicit rewards!", pt: "Leve um barco para fora dos portos do Pescador, para os locais de Ponto de Pesca (quanto mais longe, melhor), e segure F para iniciar a pesca (Use a âncora para estabilizar o seu barco). Uma vez que você tenha apanhado seu limite de peixes, vá para o Ponto de Vendas e use o menu para vender suas capturas. AVISO: Os rumores de um ponto de pesca ilegal mítico devem ser ignorados! A pesca ilegal pode dar-lhe estrelas de procurado e torná-lo um fugitivo! Resista à tentação, independentemente das recompensas ilícitas!", de: "Verwende eines der Fischerboote und gehe Fischen an einem der Fisch-Bereiche! Je weiter draußen, desto seltenere Exemplare werden dir begenen. Ist dein Lager voll, gehe deinen Fisch verkaufen! Es gibt Gerüchte um einen geheimen, illegalen Fisch-Bereich mit riesigen Fischen, passe jedoch auf, da illegales Fischen die Polizei auf dich aufmerksam macht!"},
    "JOB_TUTORIAL_9": {en: "While at a Hunting Site hold F to start a hunt and setting traps (red triangles). Watch for triggered traps (yellow dots)  and hold F there to catch game. Repeat until you have bagged your limit, then go to Selling Site and use F key menu to sell your trophies.", pt: "Enquanto estiver em Local de Caça segure F para iniciar uma caçada e posicionar armadilhas (triângulos vermelhos). Observe as armadilhas ativadas (pontos amarelos) e segure F para capturar suas presas. Repita até que você tenha armazenado seu limite, então vá para o Local de Venda para vender suas caças e obter sua recompensa.", de: "Gehe auf die Jagd an Jagd-Bereichen und drücke F, stelle Fallen auf (rote Dreiecke) und überprüfe ausgelößte Fallen (gelbe Punkte). Ist dein Lager voll, verkaufe dein gejagtes an der Verkaufsstelle!"},
    "JOB_TUTORIAL_10": {en: "Hop on one of the Pizza Scooters, go to the Pizzaria and hold F to load pizzas. Then look for each Delivery spot and tap X to honk horn to complete every delivery on your run.", pt: "Suba em uma das Scooters de Pizza, vá para a Pizzaria e segure F para se abastecer de pizzas. Em seguida, procure por cada ponto de Entrega e toque em X para buzinar e completar todas as entregas em sua corrida.", de: "Nimm eines der Moppeds und belade es an der Pizzeria (F) und liefer die Pizzen aus indem du an dem Haus des Kunden Hupst."},
    "JOB_TUTORIAL_11": {en: "Take a Bus to the Starting Site at the Bus Depot and hold F to start a route. Drive the route from Bus Stop to Bus Stop for fun and prizes! Hint: Nitro helps with speed and inclines, but watch your steering!", pt: "Suba em um ônibus no depósito de ônibus e segure F para iniciar um itinerário. Dirija pela rota para os Pontos de Ônibus por diversão e prêmios! Dica: Nitro ajuda com velocidade e inclinação, mas observe sua direção!", de: "Fange die Busfahrt am Depot an und fahre entlang Medicis Buslinien. Tip: Nitro hilft aber gib auf die Steuerung acht!"},
    "JOB_TUTORIAL_12": {en: "When a passenger joins you, start the fare with /taximeter. You get paid as soon as they exit the vehicle normally, so try not to kill them before then. Hint: with Nitro you can complete fares quicker and so more often.", pt: "Quando um passageiro se junta a você, inicie o taximetro com /taximeter. Você recebe o pagamento assim que sair do veículo normalmente, então tente não matá-los antes disso. Dica: com Nitro você pode completar as tarifas mais rapidamente e, de forma mais frequente.", de: "Sobald du einen Kunden hast, starte das Taximeter mit /taximeter und erhalte die Bezahlung am Ende der Fahrt. Tip: Nitro hilft dir mehr Kunden und weniger Zeit an ihr Ziel zu bringen."},
    "JOB_TUTORIAL_13": {en: "Go to Rebel-held or neutral bases and take them back with your mere presence. Prevent Rebels from evicting you by any means necessary! Once taken, bases will be locked to your side for some time.", pt: "Vá para bases rebeldes ou neutras e as obtenha de volta com sua mera presença. Impeça os Rebeldes de rouba-las por qualquer meio necessário! Uma vez tomadas, as bases serão asseguradas ao seu lado por algum tempo.", de: "Übernehme Basen der Rebellen und neutrale Basen und verteidige sie gegen Feinde. Nach der Übernahme sind die einige Zeit geschützt."},
    "JOB_TUTORIAL_14": {en: "Go to Military-held or neutral bases and take them back with your mere presence. Prevent Military from evicting your by any means necessary! Once taken, bases will be locked to your side for some time.", pt: "Vá para bases militares ou neutras e as obtenha de volta com sua mera presença. Impeça os militares de expulsar você por qualquer meio necessário! Uma vez tomadas, as bases serão asseguradas ao seu lado por algum tempo.", de: "Übernehme Basen die neutral, oder im Besitz des Militärs sind und verteidige sie gegen Feinde. Nach dem übernehmen sind sie einige Zeit gescgützt."},
    "JOB_TUTORIAL_15": {en: "You can petition for any Jail occupant with less than 15 minutes remaining on their term to be released with the /release command. The fees will be provided directly in your wallet. Note: fines still apply on release!", pt: "Você pode liberar qualquer prisioneiro com menos de 15 minutos restantes no prazo para ser liberado, utilize o comando /release. As taxas serão fornecidas diretamente na sua carteira.", de: "Lasse Spieler aus dem Gefängnis deren Zeit weniger als 15 Minuten beträgt und werde sofort bezahlt. Merke dass Spieler im gefängis trozdem für ihre Taten betahlen müssen!"},
    "JOB_TUTORIAL_16": {en: "When a passenger joins you, start the fare with /taximeter. You get paid as soon as they exit the vehicle normally, so try not to kill them before then. Hint: with Nitro you can complete fares quicker and so more often.", pt: "Quando um passageiro se junta a você, inicie o taximetro com /taximeter. Você recebe o pagamento assim que sair do veículo normalmente, então tente não matá-los antes disso. Dica: com Nitro você pode completar as tarifas mais rapidamente e, de forma mais frequente.", de: "Sobald du einen Kunden hast, starte das Taximeter mit /taximeter und erhalte die Bezahlung am Ende der Fahrt. Tip: Nitro hilft dir mehr Kunden und weniger Zeit an ihr Ziel zu bringen."},
    "JOB_TUTORIAL_17": {en: "Take a Plane from the Airport and at the Starting Site and hold F to start your crop-dusting run. Fly through the crop-dusting points to automatically feed the crops what they need to complete a run, then land and repeat.", pt: "Pegue um avião do aeroporto e no Local de Partida segure F para iniciar o serviço de fertilização das fazendas. Voe pelos pontos de fertlização para despejar automaticamente sobre as culturas, depois aterrisse e repita.", de: "Starte den Flug und dünge Medicis Felder! Nach einem  Flug, kehre zum FLugplatz zurück falls du weiter arbeiten möchtest."},
    "JOB_TUTORIAL_18": {en: "While in a vehicle, choose the Create new Race option to define a race course (starting positions and race checkpoints) for either circuit or point-to-point types. When you Submit your race, it will be reviewed and approved by some moderators, and can then be started from Race Spots.", pt: "Enquanto estiver em um veículo, escolha a opção Criar Nova Corrida para definir um curso de corrida (posições iniciais e checkpoints de corrida) para os tipos de circuito ou ponto a ponto. Quando você enviar sua raça, ela será revisada e aprovada pelos moderadores, e então poderá ser iniciada a partir de Pontos de Corrida.", de: "Erstelle Rennen wie du möchtest während du ein Fahrzeug verwendest! Sobald Rennen hochgeladen werden, sind sie öffentlich zugänglich und können am Renn-Punkt gestartet werden!"},
    "JOB_TUTORIAL_19": {en: "Get a truck with gas barrels and go to the Gas Loading site, then hold F to load your Truck. Look for the next assigned Gas Station on your route and drive there to unload, until done. Hint: beware steep hills, sharp turns, and bumps!", pt: "Entre em um caminhão com barris de gás e vá até o Ponto de Carregamento de Gasolina, depois segure F para carregar seu caminhão. Procure o próximo posto de gasolina designado em sua rota e dirija até lá para descarregar, até terminar. Dica: cuidado com colinas íngremes, curvas fechadas e solavancos!", de: "Belade deinen Truck an einem Start-Punkt (F) und liefere das Benzin an die markierten Tankstellen! Gib jedoch auf deine Fracht acht!"},
    "JOB_TUTORIAL_20": {en: "Long ago on Medici, earlier civilizations wrought artefacts from Bavarium. Some were buried in rituals lost to time, some in ancient cataclysms or lost at sea. But over time, things made from Bavarium will always rise! Use the Interaction Menu (M) to access your Job Options and turn on your Magnetic Detector to find the closest one by exploring, then dig it up by pressing F and sell it at Bavarium Museum at your Job site.", pt: "Há muito tempo atrás, em Medici, as civilizações anteriores produziam artefatos da Bavarium. Alguns foram enterrados em rituais perdidos no tempo, alguns em antigos cataclismos ou perdidos no mar. Mas ao longo do tempo, as coisas feitas a partir de Bavarium sempre vão surgir! Use o Menu do seu Emprego no Menu de Interação (M) para ligar o Detetor Magnético, ao encontrar uma Relíquia, use a tecla F para desenterrá-lo e então vendê-la no Museu do Bavarium no seu local de trabalho.", de: "Vor langer Zeit stellten frühere Zivilisationen auf Medici Artefakte aus Bavarium her. Manche wurden in Ritualen oder verloren durch Katastrophen, and Land wie zu See. Über die Zeit hinweg sind diese jedoch wieder aufgetaucht. Verwende das Interaktionsmenü (M) um deine Job-Optionen zu sehen. Verwende den Magnetsensor um Bavarium zu finden, halte dann F gedrückt um danach zu graben. Am Ende kannst du deine Relikte am Bavarium-Museum verkaufen."},

 
    "COMMANDS_JOB_HELP_DESCRIPTION_1": {en: "Does nothing", pt: "Não faz nada", de: "Tut nichts"},
    "COMMANDS_JOB_HELP_DESCRIPTION_2": {en: "Makes deliveries of Bavarium to the Military Bases of the government", pt: "Faz entregas de Bavarium abastecendo as Bases Militares do Governo", de: "Liefert Bavarium an Militärbasen"},
    "COMMANDS_JOB_HELP_DESCRIPTION_3": {en: "Fix, paint, and rollover vehicles", pt: "Conserta, pinta e descapota veículos", de: "Repariere und lackiere Fahrzeuge"},
    "COMMANDS_JOB_HELP_DESCRIPTION_4": {en: "Helps and provides health to players", pt: "Socorre e fornece saúde aos jogadores", de: "Hilft und bietet Spielern Hilfe an"},
    "COMMANDS_JOB_HELP_DESCRIPTION_5": {en: "Announces about the news around Médici, while drives your Heli or Propaganda Van", pt: "Noticía sobre as novidades em Medici em seu Helicóptero ou Van de Propaganda", de: "Teilt Medici die Neuesten Ereignisse mit"},
    "COMMANDS_JOB_HELP_DESCRIPTION_6": {en: "Harvest the crop driving your tractor. Look for a Starting of Harvest Site to get started", pt: "Colhe a lavoura em cima de seu trator. Procure um Ponto de Inicio da Colheita para começar", de: "Farme die Felder von Medici und Ernte Weizen"},
    "COMMANDS_JOB_HELP_DESCRIPTION_7": {en: "Responsible for maintaining the line and the order of Civilians", pt: "Responsável por manter a linha e a ordem dos Civís", de: "Verantworlich für die Verteidigung der Gesetze von Medici"},
    "COMMANDS_JOB_HELP_DESCRIPTION_8": {en: "Fishes big (or small) fish on the high seas and make a good money for it! May fish expensive fishes illegally if you go further from the coast", pt: "Pesca grandes (ou pequenos) peixes em alto-mar e ganhe uma boa grana por isso! Podendo pescar peixes mais caros de forma ilegamente se for mais longe da costa", de: "Gehe angeln und verdiene gutes Geld damit!"},
    "COMMANDS_JOB_HELP_DESCRIPTION_9": {en: "Hunts animals in the forest, and sell them for money", pt: "Caça animais na floresta e os vende por dinheiro", de: "Gehe auf die Jagd in der Wildnis"},
    "COMMANDS_JOB_HELP_DESCRIPTION_10": {en: "Deliver pizza around Médici", pt: "Entrega pizza por Médici", de: "Liefere Pizza an Medicis Bewohner"},
    "COMMANDS_JOB_HELP_DESCRIPTION_11": {en: "Drive a bus around Médici", pt: "Digite um ônibus por Médici", de: "Fahre Medicis Buse"},
    "COMMANDS_JOB_HELP_DESCRIPTION_12": {en: "Deliver passengers around Médici", pt: "Busca e entrega passageiros em Médici", de: "Bringe Medicis Bürger an ihr Ziel!"},
    "COMMANDS_JOB_HELP_DESCRIPTION_13": {en: "Takes care of Military Bases, must conquer and maintain them to keep the production of the Bavarium", pt: "Toma conta das bases militares do governo, deve conquistar e mantê-las na ordem de manter a produção de Bavarium", de: "Kümmere dich um Medicis Militärbasen und so die Herstellung des Bavariums"},
    "COMMANDS_JOB_HELP_DESCRIPTION_14": {en: "Sabotages the Government's Military Bases taking control of them", pt: "Sabota as Bases Militares do Governo e toma o controle delas", de: "Sabotiere die Regierung durch das Übernehmen der Militärbasen"},
    "COMMANDS_JOB_HELP_DESCRIPTION_15": {en: "Releases a prisioner from the jail for a fee", pt: "Libera um prisioneiro da cadeira por uma taxa", de: "Hilf Leuten aus dem Gefängnis"},
    "COMMANDS_JOB_HELP_DESCRIPTION_16": {en: "Deliver passengers around Médici, in a Helicopter", pt: "Busca e entrega passageiros em Médici, em um Helicóptero", de: "Bringe Medicis bewohner an ihr Ziel, per Helikopter"},
    "COMMANDS_JOB_HELP_DESCRIPTION_17": {en: "Fly by Médici spraying government crops", pt: "Voa por Médici pulverizando as plantações do governo", de: "Fliege über Medici und dünge die Felder"},
    // JOBS
 
    // JOB TRANSPORTER
    "TRANSPORTER_BUTTON_START_2": {en: "Start Delivery", pt: "Iniciar Entrega", de: "Starte die Lieferung"},
    "TRANSPORTER_BUTTON_START_10": {en: "Start Delivery", pt: "Iniciar Entrega", de: "Starte die Lieferung"},
    "TRANSPORTER_BUTTON_START_11": {en: "Start Ride", pt: "Iniciar Itinerário", de: "Starte die Fahrt"},
    "TRANSPORTER_BUTTON_START_7": {en: "Start Patrol", pt: "Iniciar Patrulha", de: "Starte die Streifefahrt"},
    "TRANSPORTER_BUTTON_START_17": {en: "Start Job", pt: "Iniciar Serviço", de: "Beginne mit der Arbeit"},
    "TRANSPORTER_BUTTON_START_19": {en: "Start Shipment", pt: "Iniciar Transporte", de: "Starte Lieferung"},
 
    "TRANSPORTER_BUTTON_END": {en: "Deliver", pt: "Entregar", de: "Liefere"},
    "TRANSPORTER_BUTTON_END_STOP": {en: "Stop the Vehicle", pt: "Pare o Veículo", de: "Stoppe das Fahrzeug"},
    "TRANSPORTER_BUTTON_END_HORN": {en: "Horn to Deliver", pt: "Buzine para Entregar", de: "Hupe um zu liefern"},
    "TRANSPORTER_YET_WORKING": {en: "You are already working!", pt: "Você já está trabalhando!", de: "Du arbeitest schon!"},
    "TRANSPORTER_NOT_WORKING": {en: "You are not working!", pt: "Você não está trabalhando!", de: "Du arbeitest im Moment nicht!"},
    "TRANSPORTER_NOT_IN_END": {en: "You are not at the %%!", pt: "Você não está no %%!", de: "Du bist nicht am %%!"},
    "TRANSPORTER_NOT_IN_START": {en: "You are not at a %%!", pt: "Você não está em um %%!", de: "Du nist nicht in einem %%!"},
    "TRANSPORTER_NOT_IN_LOADED_VEHICLE": {en: "You must be in your loaded vehicle!", pt: "Você precisa estar em seu veículo com a carga!", de: "Du musst in einem beladenen Fahrzeug sein!"},
    "TRANSPORTER_NOT_IN_UNLOADED_VEHICLE": {en: "You must be driving a %%!", pt: "Você precisa estar dirigindo um(a) %%!", de: "Du musst ein %% fahren!"},
    "TRANSPORTER_BACK_VEHICLE": {en: "Back to the Vehicle (%%)!", pt: "Volte para o Veículo (%%)!", de: "Gehe zum Fahrzeug zurück (%%)!"},
    "TRANSPORTER_QUITTED": {en: "You have lost your work!", pt: "Você perdeu seu trabalho!", de: "Auftrag abgebrochen!"},
    "TRANSPORTER_DAMAGED_PRODUCT": {en: "You have lost your delivery because you damaged your product!", pt: "Você perdeu sua entrega porque você avariou seu produto!", de: "Aufgrund großem schaden ist deine Lieferung zerstört worden!"},
    "TRANSPORTER_PRODUCTDAMAGE": {en: "Product Damage", pt: "Dano ao Produto", de: "Produkt-Schaden"},
 
    "JOB_TRANSPORTING_2": {en: "Delivering Bavarium", pt: "Entrega de Bavarium", de: "Bavarium liefern"},
    "JOB_TRANSPORTING_10": {en: "Delivery Progress", pt: "Progresso da Entrega", de: "Lieferungs-Fortschritt"},
    "JOB_TRANSPORTING_11": {en: "Bus Ride Progress", pt: "Progresso do Intinerário", de: "Buslinien-Fortschritt"},
    "JOB_TRANSPORTING_7": {en: "Patrolling Progress", pt: "Progresso da Patrulha", de: "Streife-Fortschritt"},
    "JOB_TRANSPORTING_17": {en: "Spraying Progress", pt: "Progresso da Pulverização", de: "Dung-Fortschritt"},
    "JOB_TRANSPORTING_19": {en: "Transport Progress", pt: "Progresso do Transporte", de: "Liefer-Fortschritt"},
 
    "TRANSPORTER_UNLOADED_GOTO_NEXT_2": {en: "You delivered at this point, go to the next stop!", pt: "Você entregou neste ponto, vá para a próxima parada!", de: "Du hast diesen Bereich beliefert, gehe zum nächsten!"},
    "TRANSPORTER_UNLOADED_GOTO_NEXT_10": {en: "You delivered one pizza, go to the next House!", pt: "Você entregou uma pizza, vá para a próxima Casa!", de: "Du hast eine Pizza geliefert, gehe zum nächsten Haus!"},
    "TRANSPORTER_UNLOADED_GOTO_NEXT_11": {en: "You stopped at this point, go to the next Bus Stop!", pt: "Você parou neste ponto, vá para o próximo Ponto de Ônibus!", de: "Du hast hier angehalten, fahre nun zur nächsten Haltestelle!"},
    "TRANSPORTER_UNLOADED_GOTO_NEXT_7": {en: "You patrolled in this city, go to the next one!", pt: "Você patrulhou nesta cidade! Vá para a próxima!", de: "Du hast dieses Dord kontrolliert, nun zum nächsten!"},
    "TRANSPORTER_UNLOADED_GOTO_NEXT_17": {en: "You sprayed in this crop, go to the next one!", pt: "Você pulverizou nesta plantação! Vá para a próxima!", de: "Du hast dieses Feld gedüngt, auf zum nächsten!"},
    "TRANSPORTER_UNLOADED_GOTO_NEXT_19": {en: "You transported at this Gas Station, go to the next one!", pt: "Você descarregou neste Posto de Combustível, vá para o próximo!", de: "Du hast diese Tankstelle beliefert, gehe zur nächsten!"},
 
    "TRANSPORTER_UNLOADED_BAVARIUM_2": {en: "You unloaded %%KG of Bavarium and earned $ %% and %% XP!", pt: "Você descarregou %%KG de Bavarium e ganhou $ %% e %% XP pelo serviço!", de: "Du hast %%KG Bavarium geliefert und hast $ %% und %% XP verdient!"},
    "TRANSPORTER_UNLOADED_2": {en: "You unloaded the goods and earned $ %% and %% XP!", pt: "Você descarregou a mercadoria e ganhou $ %% e %% XP pelo serviço!", de: "Du hast die Lieferung beendet und hast $ %% Und %% XP verdient!"},
    "TRANSPORTER_UNLOADED_10": {en: "You delivered all the pizzas and earned $ %% and %% XP!", pt: "Você entregou todas as pizzas e ganhou $ %% e %% XP pelo serviço!", de: "Du hast alle Pizzen geliefert und hast $ %% und %% XP verdient!"},
    "TRANSPORTER_UNLOADED_11": {en: "You finished the itinerary and earned $ %% and %% XP!", pt: "Você finalizou o itinerário e ganhou $ %% e %% XP pelo serviço!", de: "Die Busfahrt ist beendet und du hast $ %% und %% XP verdient!"},
    "TRANSPORTER_UNLOADED_7": {en: "You finished the patrol and earned $ %% and %% XP! The citizen are safer!", pt: "Você finalizou a patrulha e ganhou $ %% e %% XP pelo serviço! Os cidadãos estão em segurança!", de: "Die Streife ist zu Ende und du hast $ %% und %% XP verdient!"},
    "TRANSPORTER_UNLOADED_17": {en: "You finished the spraying and earned $ %% and %% XP! The crops are more fertile!", pt: "Você finalizou a pulverização e ganhou $ %% e %% XP pelo serviço! As plantações estão mais férteis!", de: "Du hast deinen Job beendet und hast $ %% und %% XP verdient!"},
    "TRANSPORTER_UNLOADED_19": {en: "You fueled this Gas Station and earned $ %% and %% XP!", pt: "Você abasteceu este Posto de Combustível e ganhou %% e %% XP!", de: "Du hast Benzin geliefert und hast $ %% und %% XP verdient!"},
   
    "TRANSPORTER_LOADED_2": {en: "Your truck has been loaded! Drive to the Unloading Site to make the deliver!", pt: "Seu caminhão foi carregado! Dirija até o Ponto de Descarregamento para fazer a entrega!", de: "Dein Truck wurde beladen, fahre nun zu den Lieferungs-Stellen!"},
    "TRANSPORTER_LOADED_10": {en: "Your scooter has been loaded with pizzas! Drive to the Unloading Sites to make the deliveries!", pt: "Sua lambreta foi carregada de pizzas! Dirija até os Pontos de Descarregamentos para fazer as entregas!", de: "Dein Mopped wurde beladen, fahre zu den Kunden und liefere die Pizzen!"},
    "TRANSPORTER_LOADED_11": {en: "You started the run! Drive to the Bus Stops to complete the itinerary!", pt: "Você iniciou a corrida! Percorra os Pontos de Ônibus para completar o itinerário!", de: "Busfahrt gestartet, fahre entlang den Bushaltestellen!"},
    "TRANSPORTER_LOADED_7": {en: "You started the patrol! Travel the route to keep order in the cities!", pt: "Você iniciou a patrulha! Percorra a rota para manter a ordem na cidade!", de: "Streife gestartet, fahre zu markierten Dörfern um sie zu kontrollieren!"},
    "TRANSPORTER_LOADED_17": {en: "You started the spraying! Fly over the crops to spray on them!", pt: "Você iniciou a pulverização! Voe sobre as fazendas para pulverizar sobre elas!", de: "Flug gestartet, begib dich zu den Feldern um sie zu düngen!"},
    "TRANSPORTER_LOADED_19": {en: "You started the shipment! Drive to the Gas Station to fuel it.", pt: "Você iniciou o transporte! Vá para o posto de Combustível para abastece-lo!", de: "Liefereung gestartet, beliefere nun die Tankstellen!"},
 
    "TRANSPORTER_VEHICLE_2": {en: "Truck", pt: "Caminhão", de: "Truck"},
    "TRANSPORTER_VEHICLE_10": {en: "Scooter", pt: "Lambreta", de: "Moped"},
    "TRANSPORTER_VEHICLE_11": {en: "Bus", pt: "Ônibus", de: "Bus"},
    "TRANSPORTER_VEHICLE_7": {en: "Police Car", pt: "Carro de Policia", de: "Polizeifahrzeug"},
    "TRANSPORTER_VEHICLE_17": {en: "Agricultural Plane", pt: "Avião Agrícola", de: "Landwirtschaftliches Flugzeug"},
    "TRANSPORTER_VEHICLE_19": {en: "Tanker Truck", pt: "Caminhão com Gasolina", de: "Benzintruck"},
 
    "TRANSPORTER_LOADING_SITE_2": {en: "Bavarium Loading Site", pt: "Área de Carregamento de Bavarium", de:"Bavarium-Ladepunkt"},
    "TRANSPORTER_LOADING_SITE_10": {en: "Pizzeria", pt: "Pizzaria", de: "Pizzeria"},
    "TRANSPORTER_LOADING_SITE_11": {en: "Bus Depot", pt: "Terminal de Ônibus", de: "Busdepot"},
    "TRANSPORTER_LOADING_SITE_7": {en: "Police Department", pt: "Departamento de Polícia", de: "Polizeirevier"},
    "TRANSPORTER_LOADING_SITE_17": {en: "Starting Site", pt: "Área de Ínicio", de: "Startpunkt"},
    "TRANSPORTER_LOADING_SITE_19": {en: "Gas Loading Site", pt: "Área de Carregamento de Gasolina", de: "Benzin-Ladestelle"},
 
    "TRANSPORTER_UNLOADING_SITE_2": {en: "Unloading Site", pt: "Ponto de Descarregamento", de: "Zielpunkt"},
    "TRANSPORTER_UNLOADING_SITE_10": {en: "Delivery Point", pt: "Ponto de Entrega", de: "Lieferungpunkt"},
    "TRANSPORTER_UNLOADING_SITE_11": {en: "Bus Stop", pt: "Ponto de Ônibus", de: "Bushaltestelle"},
    "TRANSPORTER_UNLOADING_SITE_7": {en: "Checkpoint", pt: "Ponto de Checagem", de: "Checkpoint"},
    "TRANSPORTER_UNLOADING_SITE_17": {en: "Crop", pt: "Plantação", de: "Weizen"},
    "TRANSPORTER_UNLOADING_SITE_19": {en: "Gas Station", pt: "Posto de Combustível", de: "Tankstelle"},
 
    "COMMANDS_DESCRIPTION_LOAD": {en: "loads your vehicle being at the Loading Site", pt: "carrega seu veículo no Ponto de Carregamento", de: "Beladet dein Fahrzeug an der Pizzeria"},
    "COMMANDS_DESCRIPTION_UNLOAD": {en: "unloads the goods being at the Unloading Site", pt: "descarrega as mercadorias no Ponto de Descarga", de: "Giebt die Pizza am Zielpunkt ab"},
    "COMMANDS_DESCRIPTION_DELIVER": {en: "deliver the pizzas being at the Delivery Point", pt: "descarrega as pizzas no Ponto de Entrega", de: "Liefere die Pizzen an den Lieferpunkten aus"},
    "COMMANDS_DESCRIPTION_BEGIN": {en: "starts the itinerary being at the Starting Site", pt: "inicia o itinerário estando no Ponto de Partida", de: "Startet die Route am Standort"},
    "COMMANDS_DESCRIPTION_JOB": {en: "see the commands of your Job", pt: "vê os comandos do seu Emprego", de: "Liste alle Commands deines Berufs"},
    // JOB TRANSPORTER
 
    // NECESSITIES
    "NECESSITIES_STARVING": {en: "You are starving!!!", pt: "Você está morrendo de fome!!!", de: "Du bist am Verhungern!"},
    "NECESSITIES_DYING_DEHYDRATION": {en: "You are dying of dehydration!!!", pt: "Você está morrendo de sede!!!", de: "Du bist am Verdursten!"},
    // NECESSITIES
 
    // VEHICLES
    "VEHICLE_CLASS_CHOOSE": {en: "Choose a Vehicle", pt: "Escolher um veículo", de: "Wähle ein Fahrzeug"},
    "VEHICLE_CLASS_CHOOSE_DESCRIPTION": {en: "Choose a specific Vehicle.", pt: "Escolher um veículo específico.", de: "Wähle ein bestimmtes Fahrzeug aus."},
    "VEHICLE_CLASS_1": {en: "Sports", pt: "Esportivos", de: "Sportwagen"},
    "VEHICLE_CLASS_2": {en: "Supercars", pt: "Super Carros", de: "Supersport Fahrzeuge"},
    "VEHICLE_CLASS_3": {en: "Sports Classics", pt: "Esportivos Clássicos", de: "Klassische Sportwagen"},
    "VEHICLE_CLASS_4": {en: "Modern", pt: "Modernos", de: "Moderne Fahrzeuge"},
    "VEHICLE_CLASS_5": {en: "Classics", pt: "Ckássicos", de: "Klassiker"},
    "VEHICLE_CLASS_6": {en: "Off-Road", pt: "Off-Road", de: "Off-Road"},
    "VEHICLE_CLASS_7": {en: "F1", pt: "F1", de: "F1"},
    "VEHICLE_CLASS_8": {en: "Motorcycles", pt: "Motos", de: "Motorräder"},
    "VEHICLE_CLASS_9": {en: "ATV", pt: "ATV", de: "ATV"},
    "VEHICLE_CLASS_10": {en: "Van", pt: "Van", de: "Van"},
    "VEHICLE_CLASS_11": {en: "Monster Trucks", pt: "Monster Trucks", de: "Monster Trucks"},
    "VEHICLE_CLASS_12": {en: "Heavy", pt: "Pesados", de: "Schwere Fahrzeuge"},
    "VEHICLE_CLASS_13": {en: "Tanks", pt: "Tanques", de: "Panzer"},
    "VEHICLE_CLASS_14": {en: "The Rocket", pt: "The Rocket", de: "The Rocket"},
    "VEHICLE_CLASS_15": {en: "Sail Boats", pt: "Veleiros", de: "Segelboote"},
    "VEHICLE_CLASS_16": {en: "Jet-Ski", pt: "Jet-Ski", de: "Jet-Ski"},
    "VEHICLE_CLASS_17": {en: "Motorboats", pt: "Lanchas", de: "Motorboote"},
    "VEHICLE_CLASS_18": {en: "Fishing Boats", pt: "Barcos de Pesca", de: "Fischerboote"},
    "VEHICLE_CLASS_19": {en: "Rubber Ducky", pt: "Rubber Ducky", de: "Rubber Ducky"},
    // VEHICLES
 
    // LAWYER
    "COMMANDS_DESCRIPTION_LAWYER": {en: "request for a Lawyer", pt: "requisita um advogado", de: "Beantrage einen Anwalt"},
 
    "LAWYER_YOU_ARE_NOT_ARRESTED": {en: "You are not arrested!", pt: "Você não está preso!", de: "Du bist nicht im Gefängnis!"},
    "LAWYER_REQUESTED_LAWYER": {en: "The prisioner %% is offering $ %% for a lawyer to get out of jail! Type /release [%%] to accept.", pt: "O prisioneiro %% está oferenço $%% para um advogado que o retirar da cadeia! Digite /release [%%] para aceitar."},
    "LAWYER_YOU_REQUESTED_LAWYER": {en: "You requested a Lawyer!", pt: "Você fez um pedido de um Advogado!", de: "Du hast einen Anwalt beantragt"},
    "LAWYER_YOUR_REQUEST_HAS_BEEN_EXPIRED": {en: "You Lawyer request has been expired.", pt: "Seu pedido de advogado expirou!", de: "Dein Antrag ist abgelaufen!"},
    "LAWYER_NOT_REQUIRING": {en: "This player isn't requiring lawyer.", pt: "Esse jogador não está requisitando um advogado!", de: "Dieser Spieler braucht keinen Anwalt"},
    "LAWYER_YOU_RELEASED_PRISIONER": {en: "You released the prisioner %%, and received $ %% and %% XP!", pt: "Você liberou o preso %% e recebeu $ %% e %% XP!", de: "Du hastr %% freigelassen und $ %% und %% XP verdient!"},
    "LAWYER_LAWYER_RELEASED_YOU": {en: "The Lawyer %% released you from the prision for $ %%!", pt: "O advogado %% te tirou da prisão por $ %%!", de: "Der Anwalt %% hat dich für $ %% freigesprochen!"},
    "LAWYER_HAVE_TO_WAIT": {en: "Your sentence must be under 15 minutes before you can ask for a lawyer!", pt: "Sua sentença precisa estar abaixo de 15 minutos antes de você poder pedir por um advogado!", de: "Deine Zeit im Gefängnis muss unter 15 Minuten sein!"},
    // LAWYER
 
    // CONVENIENCE STORE
    "CONVENIENCESTORE_RADIOS": {en: "Radios", pt: "Radios", de: "Radios"},
    "CONVENIENCESTORE_RADIOS_DESCRIPTION": {en: "Buy new Radio Stations to listen on your vehicles", pt: "Compre novas Estações de Radio para ouvir nos veículos", de: ""},
    "CONVENIENCESTORE_BUY_RADIO_COMMON": {en: "Default Radio", pt: "Rádio Padrão", de: "Standard-Radio"},
    "CONVENIENCESTORE_BUY_RADIO_FALLOUTNEWVEGAS_DESCRIPTION": {en: "Stations Included:<br> - Radio New Vegas<br> - Mojave Music Radio", pt: "Estações Incluidas:<br> - Radio New Vegas<br> - Mojave Music Radio", de: "Eingeschlossene Stationen:<br> - Radio New Vegas<br> - Mojave Music Radio"},
    "CONVENIENCESTORE_BUY_PARACHUTE": {en: "Buy Parachute", pt: "Comprar Paraquedas", de: "Kaufe Fallschirm"},
    "CONVENIENCESTORE_BUY_PARACHUTE_DESCRIPTION": {en: "Buys the parachute to be able to glide", pt: "Compra o paraquedas para poder planar", de: "Kaufe den Fallschirm um lange strecken besser zurückzulegen"},
    "CONVENIENCESTORE_BUY_WINGSUIT": {en: "Buy Wingsuit", pt: "Comprar Wingsuit", de: "Kaufe Wingsuit"},
    "CONVENIENCESTORE_BUY_WINGSUIT_DESCRIPTION": {en: "Buy Wingsuit", pt: "Comprar Wingsuit", de: "Kaufe Wingsuit"},
    "CONVENIENCESTORE_WINGSUIT": {en: "Wingsuit", pt: "Wingsuit", de: "Wingsuit"},
    "CONVENIENCESTORE_WINGSUIT_DESCRIPTION": {en: "[VIP Only] Wingsuit Stuff", pt: "[Somente VIP] Equipamentos de Wingsuit", de: "[Nur für VIP] Wingsuit"},
    "CONVENIENCESTORE_WINGSUITLEVEL": {en: "Upgrade lvl. %%", pt: "Atualizar lvl. %%", de: "Upgrade Level %%"},
    "CONVENIENCESTORE_WINGSUITLEVEL_DESCRIPTION": {en: "Upgrade your wingsuit to a more powerful version", pt: "Atualizar seu wingsuit para uma versão mais potente", de: "Verbesserere deinen Wingsuit und mache ihn stärker"},
    "CONVENIENCESTORE_WINGSUIT_MAXED": {en: "Your Wingsuit is maximized", pt: "Seu wingsuit está maximizado", de: "Maximale Wingsuit-Upgrades erreicht"},
    // CONVENIENCE STORE
 
    // SPEED RADAR
    "SPEED_RADAR_LABEL": {en: "Speed Radar", pt: "Radar", de: "Blitzer"},
    "SPEED_RADAR_REPORT": {en: "Speed Limit: %% KM/H<br>Your Speed: %% KM/H", pt: "Limite de Velocidade: %% KM/H<br>Sua Velocidade: %% KM/H", de: "Geschwindigkeitslimit: %% KM/H<br>Deine Geschwuindigkeit: %% KM/H"},
    "SPEED_RADAR_EXCEEDED_LOWLEVEL": {en: "You have exceeded the Limit Speed, but as you have level below 5, you didn't get Wanted Stars.", pt: "Você excedeu o Limite de Velocidade, mas como possui nível abaixo de 5, você não obteve Estrelas de Procurado.", de: "Du wurdest geblitzt, aber da dein level noch under Lavel 5 ist, zählt es nicht als Straftat."},
    // SPEED RADAR
 
    // TUTORIAL
    "TUTORIAL_LABEL": {en: "Tutorial", pt: "Tutorial", de: "Tutorial"},
 
    "TUTORIAL_BEGINNER_0": {en: "In Just Cause - Roleplay, you can carry out Jobs with players around the world.", pt: "Em Just Cause - Roleplay, você pode realizar trabalhos com jogadores do mundo todo.", de: "Auf Just Cause - Roleplay konnst du Berufe mit Spielern auf der ganzen Welt ausführen"},
    "TUTORIAL_BEGINNER_1": {en: "As you play you will gain Experience (XP). Performing Jobs will increase your XP.", pt: "Conforme você joga você ganhará Experiência (XP). Realizar Trabalhos irá aumentar sua XP.", de: "Während des Spielens bekommst du XP! Durch das Ausführen von Berufen kannst du dein XP-Inkommen steigern!"},
    "TUTORIAL_BEGINNER_2": {en: "As your XP increases, your Level will increase. This will unlock new Jobs, equipment and abilities.", pt: "Conforme sua XP aumenta, seu Nível irá aumentar. Isso irá liberar novos Empregos, equipamentos e habilidades.", de: "Je mehr XP du bekommst, desto mehr Berufe, Ausrüstung und Fähigkeiten werden freigeschaltet!"},
    "TUTORIAL_BEGINNER_3": {en: "Cash is the key to success in Just Cause - Roleplay. Buy Houses, Licenses for Driving, Utensils and entertain yourself and others with various activities. You can earn cash by performing Jobs.", pt: "Dinheiro é a chave para o sucesso em Just Cause - Roleplay. Compre Casas, Habilitações, Utensilhos e se entretenha com várias atividades.", de: "Geld ist ein wichtiger Bestandteil von Just Cause - Roleplay! Arbeite um Geld zu verdienen und kaufe Häuser, Führerscheine und andere Dinge um dich und andere Spieler zu unterhalten!"},
    "TUTORIAL_BEGINNER_4": {en: "You are unemployed, go to the Town Hall to get your first job.", pt: "Você está desempregado, vá para a Prefeitura para conseguir seu primeiro emprego.", de: "Du bist arbeitslos! Brauchst du einen Beruf? Besuche das Rathaus um nach einem zu schauen!"},
    "TUTORIAL_BEGINNER_5": {en: "To find the location of the Town Hall, Stores and Establishments, open the GPS by pressing M.", pt: "Para ver a localização da Prefeitura, Lojas e Estabelecimentos, pressione M.", de: "Suchst du etwas? Versuche es mit dem GPS im Interaktionsmenü (M)!"},
    "TUTORIAL_BEGINNER_6": {en: "Continue to learn about the server! Press J for more Tutorials and the Help Panel.", pt: "Continue aprendendo sobre o servidor! Pressione J para mais Tutoriais e o Painel de Ajuda.", de: "Falls du mehr detailreiche Informationen zu diesem Server möchtest, verwende das Help-Panel (J)!"},
 
    "TUTORIAL_BANK_0": {en: "It's recommended you to deposit all your money in the bank. Per hour your money will yield 0.2% (0.4% for VIPs).", pt: "É recomendável você guardar todo seu dinheiro no banco, por hora ele irá render 0.2% de seu dinheiro (0.4% para VIPs).", de: "Lagere dine Geld wenn möglich auf der Bank. Dein Vermögen wächst jede Stunde um 0.2% (0.4% für VIPs)"},
    "TUTORIAL_BANK_1": {en: "If you die, you'll lose some of the money in your pocket, so keep it safe in the bank.", pt: "Caso você morra, você perderá parte do dinheiro que você possui em seu bolso, portanto o mantenha salvo no banco.", de: "Solltest du sterben, verlierst du einiges an Geld das du mit dir führst! Also halte es sicher in der Bank!"},
 
    "TUTORIAL_TOWNHALL_0": {en: "The Town Hall is the place where you can change jobs whenever you want. Watch out for the minimum level and the fixed salary offered for each job.", pt: "A Prefeitura é o lugar onde você poderá trocar de emprego sempre que quiser. Atente para o nível mínimo e o salário fixo oferecido por cada emprego.", de: "An Rathäusern kannst du deinen Beruf ändern wannimmer du möchtest! Achte einfach auf das mindest-Level und den festgelehnten Lohn sowie die Dauer bis zum nächsten möglichen Beruf-Wechsel (falls vorhanden)!"},
 
    "TUTORIAL_SNACKBAR_0": {en: "Over time you will be hungry and thirsty, you can buy food in the Snack Bars scattered around the map.", pt: "Com o passar do tempo você ficará com fome e com sede. Você pode comprar comida nas lanchonetes espalhadas pelo mapa.", de: "Nach einer Weile bekommts du Hunger/Durst, also halte nach einer Snackbar Ausschau!"},
    "TUTORIAL_SNACKBAR_1": {en: "You can press M (Interaction Menu) to set your GPS to the location of all the Snack Bars.", pt: "Você pode pressionar M (Menu de Interação) para setar seu GPS na localização de todas as Lanchonetes.", de: "Du kannst das GPS im Interaktionsmenü verwenden (M) um Snackbars zu finden."},
 
    "TUTORIAL_GASSTATION_0": {en: "Driving spends gas, your gasoline is global and is the same for all vehicles, so keep it fueled.", pt: "Dirigir gasta gasolina, a sua gasolina é global e vale para todos os veículos, portanto mantênha-se abastecido.", de: "Das Benzin ist für alle Fahrzeuge gleich und wird beim Fahren verbraucht, also tanke von Zeit zu Zeit einmal!"},
 
    "TUTORIAL_VEHICLE_0": {en: "Every citizen must have a Driver's License, after level 10 you can be arrested if you don't have a Driver's License", pt: "Todo cidadão deve possuir Carteira de Habilitação, após o nível 10 você poderá ser preso caso ainda não tenha tirado a sua.", de: "Alle Bürger brauchen einen Führerschein! Nach Level zehn kann man festgenommen werden wenn man keinen besitzt!"},
 
    // "TUTORIAL_TOWNHALL_0": {en: "", pt: "", de: ""},
    // TUTORIAL
 
    // ANNOUNCER
    "ANNOUNCE_0": {en: "Are you unemployed? Look for a Town Hall!", pt: "Está desempregado? Procure uma Agência de Emprego!", de: "Brachst du einen Beruf? Schaue nach einem Rathaus!"},
    "ANNOUNCE_1": {en: "Need help? type /help to see all (obsolete) commands!", pt: "Precisa de ajuda? digite /help para ver todos os comandos (obsoletowe need to test the fisherman to see if anything has broken)!", de: "Brachst du Hilfe? Gib /help im Chat ein! (>>>Nicht mehr Funktionsfähig!)"},
    "ANNOUNCE_2": {en: "If you get AFK, you will not receive the bonus exp!", pt: "Se você ficar AFK, você não receberá os bônus de experiência!", de: "Falls du AFK bist, bekommst du keine Bonus-XP!"},
    "ANNOUNCE_3": {en: "Stay on the line and the cops will not bother you!", pt: "Fique dentro da linha e os policiais não irão te importunar!", de: "Folge dem Gesetz und die Polizei bereitet dir keine Schwierigkeiten!"},
    "ANNOUNCE_4": {en: "This server is under development! Follow our facebook and get to know everything: facebook.com/justcauserp!", pt: "Esse servidor está em desenvolvimento! Siga nosso facebook e fique a par de tudo: facebook.com/justcauserp!", de: "Dieser Server befindet sich in der Entwicklung. Für alle news folge uns auf Facebook: facebook.com/justcauserp !"},
    "ANNOUNCE_5": {en: "Follow our facebook: www.facebook.com/justcauserp!", pt: "Siga nosso facebook: www.facebook.com/justcauserp!", de: "Folge uns auf Facebook: www.facebook.com/justcauserp !"},
    "ANNOUNCE_6": {en: "Join us on Discord: http://discord.justcauserp.com!", pt: "Venha para nosso Discord: http://discord.justcauserp.com!", de: "Tritt underem Discord bei: http://discord.justcauserp.com !"},
    "ANNOUNCE_7": {en: "Don't starve! Look for a Snackbar ;)", pt: "Não morra de fome! Procure por uma lanchonete ;)", de: "Bist du hungrig? Besuche eine Snackbar!"},
    "ANNOUNCE_8": {en: "Become a VIP and help us to rent a host! See all beneficts here: http://patreon.justcauserp.com", pt: "Torne-se VIP e nos ajude a pagar o host! Veja todos os benefícios aqui: http://patreon.justcauserp.com", de: "Werde VIP und hilf den Host aufrecht zu erhalten! Für alle Vorteile besuche bitte: http://patreon.justcauserp.com"},
    "ANNOUNCE_9": {en: "When driving you spend gas, look for Gas Stations to fuel the tank!", pt: "Ao dirigir você gasta gasolina, procure Postos de Combustível para abastecer!", de: "Brachst du Benzin? Halte nach einer Tankstelle Ausschau!"},
    "ANNOUNCE_10": {en: "If you die you'll have to pay the Hospital Expenses!", pt: "Se você morrer, você terá que pagar pelas despesas do Hospital!", de: "Stirbst du, so musst du die Krankenhauskosten bezahlen!"},
    "ANNOUNCE_11": {en: "Did you find any bug, have any suggestion or trouble? Do a /report to notify us!", pt: "Encontrou algum bug, possui alguma sugestão ou problema? Deixe-nos saber por /report!", de: "Hast du einen Bug entdeckt oder hast probleme? Verwende /report um es uns mitzuteilen!"},
    "ANNOUNCE_12": {en: "You can change the Server language typing /language", pt: "You can change the Server language by typing /language", de: "Du kannst die Sprache ändern indem du den /language Command verwendest!"},
    "ANNOUNCE_13": {en: "See your job's commands at the Job option on the Interaction Menu <span class='key'>M</span>!", pt: "Saiba os comandos de seu emprego no Menu de Interação <span class='key'>M</span>!", de: "Erhalte Infos über die Commands deines Berufs im Interaktionsmenü <span class='key'>M</span>!"},
    "ANNOUNCE_14": {en: "Deposit your money in the bank regularly!", pt: "Deposite seu dinheiro no banco regularmente!", de: "Überweise regelmäßig dein Geld auf die Bank!"},
    "ANNOUNCE_15": {en: "Are you dying? Look for a Hospital or a Paramedic!", pt: "Você está morrendo? Procure um Hospital ou um Paramedico!", de: "Bist du verletzt? Halte Ausschau nach einam Krankenhaus oder Sanitäter!"},
    "ANNOUNCE_16": {en: "Press M to open your Interaction Menu!", pt: "Pressione M para abrir o Menu de Interação!", de: "Drücke M um das Interaktionsmenü zu öffnen!"},
    // ANNOUNCER
};

jcmp.languages.load(texts);
