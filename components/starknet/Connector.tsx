import { useConnect } from "@starknet-react/core";

export default function Connector() {
  const { connect, connectors } = useConnect();
  return (
    <ul>
      {connectors.map((connector) => (
        <li key={connector.id}>
          <button onClick={() => connect({ connector })}>{connector.name}</button>
        </li>
      ))}
    </ul>
  );
}
