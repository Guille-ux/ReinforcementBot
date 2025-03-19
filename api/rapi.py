import rbot as bot
import sys
import json

responses_file = sys.argv[1]
stopwords_file = sys.argv[2]
maxis = 50000

apibot = bot.ReinforcementBot(responses_file, stopwords_file, maxis)


returned = ""
log_file = "logs.json"
if sys.argv[3]=="new":
	apibot.file_bot("save_file.json", "save")
	returned = "¡Bot Created Successful!"
elif sys.argv[3] == "ask":
	apibot.file_bot("save_file.json", "load")
	question = "".join(sys.argv[4:])
	returned = apibot.ask(question)
	with open(log_file, "w") as f:
		json.dump(apibot.last, f)
elif sys.argv[3] == "update-log":
	apibot.file_bot("save_file.json", "load")
	feed = sys.argv[4]
	with open(log_file, "r") as f:
		apibot.last = json.load(f)
	apibot.reforce(feed)
	returned = "¡Thanks!"
	apibot.file_bot("save_file.json", "save")
print(returned)
