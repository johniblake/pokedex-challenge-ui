import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import _ from "lodash";

import SearchBox from "../../components/SearchBox";
import TypePicker from "../../components/TypePicker";
import PokemonCard from "../../components/PokemonCard";
import * as S from "./styled";

// this function can be used as a callback to the Array.prototype.filter method to produce a subset of pokemon
// whose types and weaknesses are a superset of the seleectedTypes and selectedWeaknesses

// returns true  --> if the pokemon's type array contains all of the types in selecetedTypes,
//               --> AND if the pokemon's weakness array contains all of the weaknesses is selectedWeaknesses
//               --> OR if the selectedTypes and selectedWeaknesses arrays are empty
//
// returns false --> if the pokemon's type array doesn't contain all of the types in selecetedTypes,
//               --> OR if the pokemon's weakness array doesn't contain all of the weaknesses is selectedWeaknesses

function matchesFilter(pokemon, selectedTypes, selectedWeaknesses) {
  let matchesTypes = true;
  let matchesWeaknesses = true;

  if (selectedTypes.length > 0) {
    selectedTypes.forEach(type => {
      matchesTypes = matchesTypes && pokemon.type.includes(type);
    });
  }

  if (selectedWeaknesses.length > 0) {
    selectedWeaknesses.forEach(type => {
      matchesWeaknesses =
        matchesWeaknesses && pokemon.weaknesses.includes(type);
    });
  }

  return matchesTypes && matchesWeaknesses;
}

// this function can be used as a callback to the Array.prototype.filter method to produce a subset of pokemon
// whose names contain the search term

// returns true  --> if the search term is a substring of the pokemon's lowercase name'
//               --> OR if the search term does not exist
//
// returns false --> if the pokemon's lowercase name does not contain the search term
function containsSearchTerm(pokemon, searchTerm) {
  let matchesSearch = true;
  if (searchTerm) {
    matchesSearch = _.deburr(pokemon.name.toLowerCase()).includes(
      _.deburr(searchTerm.toLowerCase())
    );
  }
  return matchesSearch;
}

export default function HomeScreen() {
  const { loading, error, data } = useQuery(gql`
    {
      pokemonMany {
        name
        num
        img
        type
        weaknesses
      }
    }
  `);
  if (loading)
    return (
      <S.Container>
        <p>Loading...</p>
      </S.Container>
    );
  if (error)
    return (
      <S.Container>
        <p>Error :(</p>
      </S.Container>
    );
  return (
    <S.Container>
      <h1>Pokédex</h1>
      <SearchBox
        suggestions={data.pokemonMany.map(pokemon => ({
          label: pokemon.name,
          value: pokemon.num
        }))}
      >
        {searchTerm => (
          <TypePicker title="Type">
            {selectedTypes => (
              <TypePicker title="Weaknesses">
                {selectedWeaknesses => (
                  <S.Grid>
                    {data.pokemonMany
                      //filter pokemon by selected type and weakness
                      .filter(pokemon =>
                        matchesFilter(
                          pokemon,
                          selectedTypes,
                          selectedWeaknesses
                        )
                      )
                      //apply search to filtered results
                      .filter(filteredPokemon =>
                        containsSearchTerm(filteredPokemon, searchTerm)
                      )
                      .map(pokemon => (
                        <S.CardContainer key={pokemon.num}>
                          <S.CardLink to={`/${pokemon.num}`}>
                            <PokemonCard
                              key={pokemon.num}
                              pokemon={pokemon}
                              isSmall
                              animateHovering
                            />
                          </S.CardLink>
                        </S.CardContainer>
                      ))}
                  </S.Grid>
                )}
              </TypePicker>
            )}
          </TypePicker>
        )}
      </SearchBox>
    </S.Container>
  );
}
