import { Container, Links, Content } from "./styles";

import { Link } from "react-router-dom";

import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Section } from "../../components/Section";
import { Tag } from "../../components/Tag";
import { ButtonText } from "../../components/ButtonText";

export function Details(){


  return(
    <Container>
      <Header />

      <main>
        <Content>
          <ButtonText title="Exluir Nota"/>

          <h1>
            Introdução ao React
          </h1>

          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <Section title="Links úteis">
            <Links>
              <li>https://www.rocketseat.com.br/</li>
              <li>https://www.rocketseat.com.br/</li>
            </Links>
          </Section>

          <Section title="Marcadores">
            <Tag title="express"/>
            <Tag title="node.js"/>
          </Section>

          <Link to="/">
            <Button title="Voltar"/>
          </Link>
        </Content>
      </main>

    </Container>
  )
}