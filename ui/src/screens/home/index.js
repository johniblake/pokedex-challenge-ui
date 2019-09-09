import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import _ from "lodash";

import SearchBox from "../../components/SearchBox";
import TypePicker from "../../components/TypePicker";
import PokemonCard from "../../components/PokemonCard";
import * as S from "./styled";

function isResult(pokemon, searchValue, selectedTypes, selectedWeaknesses) {
  let matchesSearch = true;
  let matchesTypes = true;
  let matchesWeaknesses = true;

  if (searchValue) {
    matchesSearch = _.deburr(pokemon.name.toLowerCase()).includes(
      _.deburr(searchValue.toLowerCase())
    );
  }

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

  return matchesTypes && matchesSearch && matchesWeaknesses;
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
        {searchValue => (
          <TypePicker title="Type">
            {selectedTypes => (
              <TypePicker title="Weaknesses">
                {selectedWeaknesses => (
                  <S.Grid>
                    {data.pokemonMany
                      .filter(pokemon =>
                        isResult(
                          pokemon,
                          searchValue,
                          selectedTypes,
                          selectedWeaknesses
                        )
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
