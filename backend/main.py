import yaml
from yaml.loader import SafeLoader
from flask import Flask, jsonify, make_response

app = Flask(__name__)

# I put this horrific abomination here because I don't want
# to type methods with all these brackets and quotation marks
# every time a want to make a new endpoint. Instead, I just
# say GET() or POST(), which feels much nicer to type. :)

GET    = lambda : ["GET"]
POST   = lambda : ["POST"]
PUT    = lambda : ["PUT"]
DELETE = lambda : ["DELETE"]

with open("data.yaml", "r") as f:
	data = yaml.load(f, Loader=SafeLoader)

# Here we add unique IDs to jobs and non-unique ones to 
# categories and questions. Needs to be refactored later.

job_id = 0

for key, value in data.items():
	cat_id = question_id = 0
	value["id"] = str(job_id)
	job_id += 1
	for key_2, value_2 in value.items():
		if key_2 not in ["levels", "id"]:
			# TODO: Added "categories" key, need to 
			# adapt the loop.
			value_2["id"] = str(cat_id)
			cat_id += 1
			for item in value_2["questions"]:
				item["id"] = str(question_id)
				question_id += 1 
		

def get_response(items):
	template = { "data": items, "success": True } 

	return jsonify(template)

# ------
# GET Methods
# ------

@app.route("/iqg/api/jobs", methods=GET())
def get_jobs():
	jobs = []
	
	for key in data:
		jobs.append({"id": data[f"{key}"]["id"], "name": key})
	
	return get_response(jobs)

@app.route("/iqg/api/jobs/<int:job_id>/categories", methods=GET())
def get_categories(job_id):
	categories = []

	for key, value in data:
		if value["id"] == str(job_id):
			 

	return True

# ------
# Utility Endpoints
# ------

@app.route("/", methods=GET())
def root():
	return make_response("", 404)

@app.route("/iqg", methods=GET())
def iqg_root():
	return make_response("", 404)

@app.route("/iqg/healthcheck", methods=GET())
def healthcheck():
	return make_response(jsonify(success=True), 200)

# ------
# Runner
# ------

if __name__ == "__main__":
	app.run(debug = True)
