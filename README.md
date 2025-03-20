# IMPORTANT 
actually is a problem with the bot, so the bot isn't working correctly with the reinforcement, i am working on that, sorry.


# ReinforcementBot
Is a ChatBot that works with Q-learning
## Swelshiniano V1, how it works
**swelshiniano** when it initializes makes a file called **save_file.json** this file has the matrix that saves the past rewards on training.

The bot uses this matrix to choose the best answer, but first the bot needs to remove all non-important words that are in the stopwords file.
```python
	def format(self, text):
		ret = text.lower()
		ret = ret.replace("á", "a")
		ret = ret.replace("é", "e")
		ret = ret.replace("í", "i")
		ret = ret.replace("ó", "o")
		ret = ret.replace("ú", "u")
		ret = ret.strip("¿")
		ret = ret.strip("?")
		ret = ret.strip("¡")
		ret = ret.strip("!")
		ret = ret.strip(".")
		ret = ret.strip(",")
		ret = ret.strip("'")
		ret = ret.strip('"')
		ret = ret.strip(";")
		ret = ret.strip("-")
		ret = ret.strip(":")
		ret = ret.split(" ")
		ret = [word for word in ret if word not in self.stop]
		return " ".join(ret)
```
(that is the part of the code that formats the input text)

**swelshiniano** also has a epsilon, a percentage of choose a random response, this ensures that the bot will never stop learning more and better responses.

