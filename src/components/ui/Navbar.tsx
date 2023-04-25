import { Container, Link, Spacer, Text, useTheme } from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";

export const Navbar = () => {
  const { theme } = useTheme();

  return (
    <div
      className="nav"
      style={{
        backgroundColor: theme?.colors.gray50.value,
      }}
    >
      <div>
        <Container
          direction="row"
          display="flex"
          css={{ alignItems: "center" }}
        >
          <Image
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
            alt="Icon del pokemon ditto"
            width={70}
            height={70}
          />

          <NextLink href="/" passHref legacyBehavior>
            <Link>
              <Text color="white" h2>
                P
              </Text>
              <Text color="white" h3>
                okémon
              </Text>
            </Link>
          </NextLink>
        </Container>
      </div>

      <div>
        <NextLink href="/favorites">
          <Text color="white" h4>
            Favoritos
          </Text>
        </NextLink>
      </div>
    </div>
  );
};
