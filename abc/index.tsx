import { Foo } from "./app/foo/screens/index";
import { FooComponent, useFoo, useFooStore } from "./global";

export const App = () => {
  const hook = useFoo();
  const store = useFooStore();

  const nestedComponent = <FooComponent />;

  return <Foo />;
};
