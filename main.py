import requests

baseURL = "http://localhost/pokemons/"

def getPokemons()->dict:
    """
        Get all pokemons from the API.
    """
    response = requests.get(baseURL)
    return response.json()

def getPokemonById(id:str)->dict:
    """
        Get a pokemon by id.
    Parameters:
        id: str -> Id of the pokemon
    Returns:
        dict -> The pokemon with the given id.
    """
    response = requests.get(baseURL+str(id))
    return response.json()

def createPokemon(pokemon:dict)->dict:
    """
        Create a pokemon.
    Parameters:
        pokemon: dict -> The pokemon to create.
    Returns:
        dict -> The created pokemon.
    """
    response = requests.post(baseURL, json=pokemon)
    return response.json()

def updatePokemon(id:str, pokemon:dict)->dict:
    """
        Update a pokemon.
    Parameters:
        id: str -> Id of the pokemon
        pokemon: dict -> The pokemon to update.
    Returns:
        dict -> The updated pokemon.
    """
    response = requests.put(baseURL+str(id), json=pokemon)
    return response.json()

def deletePokemon(id:str)->dict:
    """
        Delete a pokemon.
    Parameters:
        id: str -> Id of the pokemon
    Returns:
        dict -> The deleted pokemon.
    """
    response = requests.delete(baseURL+str(id))
    return response.json()