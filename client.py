import pokemon

base_url = "http://localhost/pokemons/"

api = pokemon.PokemonAPI(base_url)

print(api.get_pokemons())