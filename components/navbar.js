import { Navbar } from "react-bulma-components";
import Link from "next/link";

const Nav = () => (
  <Navbar>
    <Navbar.Brand>
      <Navbar.Item>
        <Link href="/">
          <img
            alt="Bulma: a modern CSS framework based on Flexbox"
            // height="28"
            src="https://bulma.io/images/bulma-logo.png"
            // width="200em"
            // height="500em"
          />
        </Link>
      </Navbar.Item>
    </Navbar.Brand>
    <Navbar.Menu>
      <Navbar.Container>
        <Navbar.Item>
          <Link href="/">
            <Navbar.Link arrowless>Home</Navbar.Link>
          </Link>
          <Link href="/123">
            <Navbar.Link arrowless>404Test</Navbar.Link>
          </Link>
        </Navbar.Item>
      </Navbar.Container>
    </Navbar.Menu>
  </Navbar>
);

export default Nav;
