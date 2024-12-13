import requests
import json

# Base URL for the API
base_url = "https://huggingface.co/spaces-json"

# Initialize a set to hold unique spaces
unique_spaces = set()

def fetch_spaces(sort_order):
    # Initialize the page index
    page_index = 0
    
    while True:
        # Construct the URL for the current page
        url = f"{base_url}?p={page_index}&sort={sort_order}"
        
        # Fetch the data from the API
        response = requests.get(url)
        
        # Check if the request was successful
        if response.status_code != 200:
            print(f"Failed to fetch data for page {page_index} with sort {sort_order}. Status code: {response.status_code}")
            break
        
        # Parse the JSON data
        data = response.json()
        
        # Check if there are spaces in the response
        if not data.get('spaces'):
            print(f"No more spaces found. Stopping at page {page_index} with sort {sort_order}.")
            break
        
        # Iterate through the spaces in the current page
        for space in data['spaces']:
            # Extract the current hardware
            current_hardware = space['runtime']['hardware']['current']
            
            # Include only spaces with hardware different from empty, zero-a10g, and cpu-basic
            if current_hardware not in [None, "zero-a10g", "cpu-basic"]:
                # Create a unique identifier for the space
                space_key = (space.get('id'), space.get('title'), space.get('author'), space.get('likes'), current_hardware, space.get('shortDescription', 'No description available'))
                
                # Add the space to the set if it's unique
                unique_spaces.add(space_key)
        
        # Increment the page index
        page_index += 1

# Fetch spaces sorted by likes
fetch_spaces("likes")

# Fetch spaces sorted by trending
fetch_spaces("trending")

# Convert the set of unique spaces to a list of dictionaries
all_spaces = [
    {
        "url": f"https://huggingface.co/spaces/{id}",
        "title": title,
        "author": author,
        "likes": likes,
        "current_hardware": current_hardware,
        "shortDescription": shortDescription
    }
    for id, title, author, likes, current_hardware, shortDescription in unique_spaces
]

# Sort the list of spaces by title alphabetically
all_spaces.sort(key=lambda x: x["title"].lower())

# Convert the list of spaces to a JSON string
all_spaces_json = json.dumps(all_spaces, indent=4)

# Save the JSON string to a file
with open("spaces.json", "w") as f:
    f.write(all_spaces_json)

# Print the number of spaces fetched
print(f"Fetched {len(all_spaces)} unique spaces.")
