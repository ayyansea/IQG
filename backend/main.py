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

for job, job_body in data.items():
	cat_id = question_id = 0
	job_body["id"] = str(job_id)
	job_id += 1
	for job_item, job_item_body in job_body.items():
		if job_item == "categories":
			for category, category_body in job_item_body.items():
				category_body["id"] = str(cat_id)
				cat_id += 1
				for question in category_body["questions"]:
					question["id"] = str(question_id)
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

	for key, value in data.items():
		if value["id"] == str(job_id):
			for category, category_body in value["categories"].items():
				categories.append({"id": category_body["id"], "name": category}) 

	return get_response(categories)

@app.route("/iqg/api/jobs/<int:job_id>/levels", methods=GET())
def get_levels(job_id):
	levels = []

	for key, value in data.items():
		if value["id"] == str(job_id):
			for level in value["levels"]:
				levels.append({"name": level})
	
	return get_response(levels)

# @app.route("/iqg/api/jobs/<int:job_id>/levels/<string:level_name>/questions", 
# 			methods=GET())
# def get_questions(job_id, level_name):
# 	questions = []

# 	for key, value in data.items():
# 		if value["id"] == str(job_id):
# 			for cat_key, cat_value in value["categories"]:
# 				for group in cat_value["questions"]:
# 					questions.append({"id": group["id"], 
# 									  "question": group["question"],
# 									  "level": group["level"]})
	
# 	return get_response(questions)

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
