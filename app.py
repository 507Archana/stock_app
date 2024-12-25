from flask import Flask, render_template, jsonify
import pandas as pd

app = Flask(__name__)

# Load the data
df = pd.read_csv('dump.csv')

# Route for the home page, displaying the list of index names
@app.route('/')
def index():
    # Get the unique index names for the left-hand side list
    indices = df['index_name'].unique().tolist()
    return render_template('index.html', indices=indices)

# Route for fetching data for a specific index
@app.route('/data/<index_name>')
def data(index_name):
    # Filter the dataframe based on the selected index name
    data = df[df['index_name'] == index_name]

    # Prepare data for the chart (select the necessary columns)
    chart_data = {
        'dates': data['index_date'].tolist(),
        'values': data['open_index_value'].tolist()
    }
    
    return jsonify(chart_data)

if __name__ == "__main__":
    app.run(debug=True)

