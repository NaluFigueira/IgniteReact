import React, { ReactElement } from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement } from "react";

interface ActiveLinkProps extends LinkProps {
  activeClassName: string;
  children: ReactElement;
}

const ActiveLink: React.FC<ActiveLinkProps> = ({
  activeClassName,
  children,
  ...rest
}) => {
  const { asPath } = useRouter();

  const className = asPath === rest.href ? activeClassName : "";

  return <Link {...rest}>{cloneElement(children, { className })}</Link>;
};

export default ActiveLink;
