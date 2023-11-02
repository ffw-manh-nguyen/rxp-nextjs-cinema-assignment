"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Form from "./Form/Form";
import LINKS from "@/utils/links";

type SearchBarProps = {
  className: string;
  id: any;
};

const SearchBar = ({ className, id }: SearchBarProps) => {
  const [searchQuery, setsearchQuery] = useState("");
  const [opened, setOpened] = useState(false);
  const formRef = useRef();
  const router = useRouter();

  const onFormSubmitHandler = (e: any) => {
    e.preventDefault();
    if (searchQuery.length === 0) {
      opened ? setOpened(false) : setOpened(true);
      return;
    }
    router.push(
      `${LINKS.SEARCH.PATHNAME}?q=${encodeURIComponent(searchQuery)}&page=1`
    );
  };

  return (
    <div className={className}>
      <Form opened={opened} ref={formRef} onSubmit={onFormSubmitHandler}>
        <div className="relative mx-auto">
          <button
            type="submit"
            className="absolute right-0 top-1/2 -translate-y-1/2"
            onClick={onFormSubmitHandler}
          >
            <svg
              className="h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              width="512px"
              height="512px"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
          <input
            aria-label="Search Input"
            id={`search-input-${id}`}
            className={`${
              opened ? "" : "hidden"
            } h-10 rounded-sm border-b bg-transparent px-5 pr-16 text-sm placeholder-white focus:outline-none`}
            type="search"
            name="search"
            placeholder="Search for a movie..."
            onChange={(e) => setsearchQuery(e.target.value)}
          />
        </div>
      </Form>
    </div>
  );
};

export default SearchBar;
