import requests

class PokemonAPI:
    def __init__(self, base_url:str):
        self.base_url = base_url

    def get_pokemons(self) -> dict:
        """
        Get all pokemons from the API.
        """
        response = requests.get(self.base_url)
        return response.json()

    def get_pokemon_by_id(self, pokemon_id: str | int) -> dict:
        """
        Get a pokemon by id.
        Parameters:
            pokemon_id: str | int -> Id of the pokemon
        Returns:
            dict -> The pokemon with the given id.
        """
        response = requests.get(f"{self.base_url}{pokemon_id}")
        return response.json()

    def create_pokemon(self, pokemon: dict) -> dict:
        """
        Create a pokemon.
        Parameters:
            pokemon: dict -> The pokemon to create.
        Returns:
            dict -> The created pokemon.
        """
        response = requests.post(self.base_url, json=pokemon)
        return response.json()

    def update_pokemon(self, pokemon_id: str | int, pokemon: dict) -> dict:
        """
        Update a pokemon.
        Parameters:
            pokemon_id: str | int -> Id of the pokemon
            pokemon: dict -> The pokemon to update.
        Returns:
            dict -> The updated pokemon.
        """
        response = requests.put(f"{self.base_url}{pokemon_id}", json=pokemon)
        return response.json()

    def delete_pokemon(self, pokemon_id: str | int) -> dict:
        """
        Delete a pokemon.
        Parameters:
            pokemon_id: str | int -> Id of the pokemon
        Returns:
            dict -> The deleted pokemon.
        """
        response = requests.delete(f"{self.base_url}{pokemon_id}")
        return response.json()