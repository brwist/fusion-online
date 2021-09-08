--
-- PostgreSQL database dump
--

-- Dumped from database version 11.1
-- Dumped by pg_dump version 13.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: btree_gin; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS btree_gin WITH SCHEMA public;


--
-- Name: EXTENSION btree_gin; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION btree_gin IS 'support for indexing common datatypes in GIN';


--
-- Name: hstore; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS hstore WITH SCHEMA public;


--
-- Name: EXTENSION hstore; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION hstore IS 'data type for storing sets of (key, value) pairs';


--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


SET default_tablespace = '';

--
-- Name: account_address; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.account_address (
    id integer NOT NULL,
    first_name character varying(256) NOT NULL,
    last_name character varying(256) NOT NULL,
    company_name character varying(256) NOT NULL,
    street_address_1 character varying(256) NOT NULL,
    street_address_2 character varying(256) NOT NULL,
    city character varying(256) NOT NULL,
    postal_code character varying(20) NOT NULL,
    country character varying(2) NOT NULL,
    country_area character varying(128) NOT NULL,
    phone character varying(128) NOT NULL,
    city_area character varying(128) NOT NULL
);


ALTER TABLE public.account_address OWNER TO saleor;

--
-- Name: account_customerevent; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.account_customerevent (
    id integer NOT NULL,
    date timestamp with time zone NOT NULL,
    type character varying(255) NOT NULL,
    parameters jsonb NOT NULL,
    order_id integer,
    user_id integer NOT NULL
);


ALTER TABLE public.account_customerevent OWNER TO saleor;

--
-- Name: account_customerevent_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.account_customerevent_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_customerevent_id_seq OWNER TO saleor;

--
-- Name: account_customerevent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.account_customerevent_id_seq OWNED BY public.account_customerevent.id;


--
-- Name: account_customernote; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.account_customernote (
    id integer NOT NULL,
    date timestamp with time zone NOT NULL,
    content text NOT NULL,
    is_public boolean NOT NULL,
    customer_id integer NOT NULL,
    user_id integer
);


ALTER TABLE public.account_customernote OWNER TO saleor;

--
-- Name: account_customernote_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.account_customernote_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_customernote_id_seq OWNER TO saleor;

--
-- Name: account_customernote_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.account_customernote_id_seq OWNED BY public.account_customernote.id;


--
-- Name: app_app; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.app_app (
    id integer NOT NULL,
    private_metadata jsonb,
    metadata jsonb,
    name character varying(60) NOT NULL,
    created timestamp with time zone NOT NULL,
    is_active boolean NOT NULL,
    about_app text,
    app_url character varying(200),
    configuration_url character varying(200),
    data_privacy text,
    data_privacy_url character varying(200),
    homepage_url character varying(200),
    identifier character varying(256),
    support_url character varying(200),
    type character varying(60) NOT NULL,
    version character varying(60)
);


ALTER TABLE public.app_app OWNER TO saleor;

--
-- Name: account_serviceaccount_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.account_serviceaccount_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_serviceaccount_id_seq OWNER TO saleor;

--
-- Name: account_serviceaccount_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.account_serviceaccount_id_seq OWNED BY public.app_app.id;


--
-- Name: app_app_permissions; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.app_app_permissions (
    id integer NOT NULL,
    app_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.app_app_permissions OWNER TO saleor;

--
-- Name: account_serviceaccount_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.account_serviceaccount_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_serviceaccount_permissions_id_seq OWNER TO saleor;

--
-- Name: account_serviceaccount_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.account_serviceaccount_permissions_id_seq OWNED BY public.app_app_permissions.id;


--
-- Name: app_apptoken; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.app_apptoken (
    id integer NOT NULL,
    name character varying(128) NOT NULL,
    auth_token character varying(30) NOT NULL,
    app_id integer NOT NULL
);


ALTER TABLE public.app_apptoken OWNER TO saleor;

--
-- Name: account_serviceaccounttoken_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.account_serviceaccounttoken_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_serviceaccounttoken_id_seq OWNER TO saleor;

--
-- Name: account_serviceaccounttoken_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.account_serviceaccounttoken_id_seq OWNED BY public.app_apptoken.id;


--
-- Name: account_staffnotificationrecipient; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.account_staffnotificationrecipient (
    id integer NOT NULL,
    staff_email character varying(254),
    active boolean NOT NULL,
    user_id integer
);


ALTER TABLE public.account_staffnotificationrecipient OWNER TO saleor;

--
-- Name: account_staffnotificationrecipient_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.account_staffnotificationrecipient_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_staffnotificationrecipient_id_seq OWNER TO saleor;

--
-- Name: account_staffnotificationrecipient_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.account_staffnotificationrecipient_id_seq OWNED BY public.account_staffnotificationrecipient.id;


--
-- Name: account_user; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.account_user (
    id integer NOT NULL,
    is_superuser boolean NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    password character varying(128) NOT NULL,
    date_joined timestamp with time zone NOT NULL,
    last_login timestamp with time zone,
    default_billing_address_id integer,
    default_shipping_address_id integer,
    note text,
    first_name character varying(256) NOT NULL,
    last_name character varying(256) NOT NULL,
    avatar character varying(100),
    private_metadata jsonb,
    metadata jsonb,
    jwt_token_key character varying(12) NOT NULL
);


ALTER TABLE public.account_user OWNER TO saleor;

--
-- Name: account_user_addresses; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.account_user_addresses (
    id integer NOT NULL,
    user_id integer NOT NULL,
    address_id integer NOT NULL
);


ALTER TABLE public.account_user_addresses OWNER TO saleor;

--
-- Name: account_user_groups; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.account_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.account_user_groups OWNER TO saleor;

--
-- Name: account_user_user_permissions; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.account_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.account_user_user_permissions OWNER TO saleor;

--
-- Name: app_appinstallation; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.app_appinstallation (
    id integer NOT NULL,
    status character varying(50) NOT NULL,
    message character varying(255),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    app_name character varying(60) NOT NULL,
    manifest_url character varying(200) NOT NULL
);


ALTER TABLE public.app_appinstallation OWNER TO saleor;

--
-- Name: app_appinstallation_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.app_appinstallation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.app_appinstallation_id_seq OWNER TO saleor;

--
-- Name: app_appinstallation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.app_appinstallation_id_seq OWNED BY public.app_appinstallation.id;


--
-- Name: app_appinstallation_permissions; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.app_appinstallation_permissions (
    id integer NOT NULL,
    appinstallation_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.app_appinstallation_permissions OWNER TO saleor;

--
-- Name: app_appinstallation_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.app_appinstallation_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.app_appinstallation_permissions_id_seq OWNER TO saleor;

--
-- Name: app_appinstallation_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.app_appinstallation_permissions_id_seq OWNED BY public.app_appinstallation_permissions.id;


--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO saleor;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO saleor;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO saleor;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO saleor;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO saleor;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO saleor;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: checkout_checkoutline; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.checkout_checkoutline (
    id integer NOT NULL,
    quantity integer NOT NULL,
    checkout_id uuid NOT NULL,
    variant_id integer NOT NULL,
    data jsonb NOT NULL,
    CONSTRAINT cart_cartline_quantity_check CHECK ((quantity >= 0))
);


ALTER TABLE public.checkout_checkoutline OWNER TO saleor;

--
-- Name: cart_cartline_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.cart_cartline_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cart_cartline_id_seq OWNER TO saleor;

--
-- Name: cart_cartline_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.cart_cartline_id_seq OWNED BY public.checkout_checkoutline.id;


--
-- Name: checkout_checkout; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.checkout_checkout (
    created timestamp with time zone NOT NULL,
    last_change timestamp with time zone NOT NULL,
    email character varying(254) NOT NULL,
    token uuid NOT NULL,
    quantity integer NOT NULL,
    user_id integer,
    billing_address_id integer,
    discount_amount numeric(12,3) NOT NULL,
    discount_name character varying(255),
    note text NOT NULL,
    shipping_address_id integer,
    shipping_method_id integer,
    voucher_code character varying(12),
    translated_discount_name character varying(255),
    metadata jsonb,
    private_metadata jsonb,
    currency character varying(3) NOT NULL,
    country character varying(2) NOT NULL,
    redirect_url character varying(200),
    tracking_code character varying(255),
    CONSTRAINT cart_cart_quantity_check CHECK ((quantity >= 0))
);


ALTER TABLE public.checkout_checkout OWNER TO saleor;

--
-- Name: checkout_checkout_gift_cards; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.checkout_checkout_gift_cards (
    id integer NOT NULL,
    checkout_id uuid NOT NULL,
    giftcard_id integer NOT NULL
);


ALTER TABLE public.checkout_checkout_gift_cards OWNER TO saleor;

--
-- Name: checkout_checkout_gift_cards_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.checkout_checkout_gift_cards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.checkout_checkout_gift_cards_id_seq OWNER TO saleor;

--
-- Name: checkout_checkout_gift_cards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.checkout_checkout_gift_cards_id_seq OWNED BY public.checkout_checkout_gift_cards.id;


--
-- Name: csv_exportevent; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.csv_exportevent (
    id integer NOT NULL,
    date timestamp with time zone NOT NULL,
    type character varying(255) NOT NULL,
    parameters jsonb NOT NULL,
    app_id integer,
    export_file_id integer NOT NULL,
    user_id integer
);


ALTER TABLE public.csv_exportevent OWNER TO saleor;

--
-- Name: csv_exportevent_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.csv_exportevent_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.csv_exportevent_id_seq OWNER TO saleor;

--
-- Name: csv_exportevent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.csv_exportevent_id_seq OWNED BY public.csv_exportevent.id;


--
-- Name: csv_exportfile; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.csv_exportfile (
    id integer NOT NULL,
    status character varying(50) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    content_file character varying(100),
    app_id integer,
    user_id integer,
    message character varying(255)
);


ALTER TABLE public.csv_exportfile OWNER TO saleor;

--
-- Name: csv_exportfile_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.csv_exportfile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.csv_exportfile_id_seq OWNER TO saleor;

--
-- Name: csv_exportfile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.csv_exportfile_id_seq OWNED BY public.csv_exportfile.id;


--
-- Name: discount_sale; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.discount_sale (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    type character varying(10) NOT NULL,
    value numeric(12,3) NOT NULL,
    end_date timestamp with time zone,
    start_date timestamp with time zone NOT NULL
);


ALTER TABLE public.discount_sale OWNER TO saleor;

--
-- Name: discount_sale_categories; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.discount_sale_categories (
    id integer NOT NULL,
    sale_id integer NOT NULL,
    category_id integer NOT NULL
);


ALTER TABLE public.discount_sale_categories OWNER TO saleor;

--
-- Name: discount_sale_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.discount_sale_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.discount_sale_categories_id_seq OWNER TO saleor;

--
-- Name: discount_sale_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.discount_sale_categories_id_seq OWNED BY public.discount_sale_categories.id;


--
-- Name: discount_sale_collections; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.discount_sale_collections (
    id integer NOT NULL,
    sale_id integer NOT NULL,
    collection_id integer NOT NULL
);


ALTER TABLE public.discount_sale_collections OWNER TO saleor;

--
-- Name: discount_sale_collections_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.discount_sale_collections_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.discount_sale_collections_id_seq OWNER TO saleor;

--
-- Name: discount_sale_collections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.discount_sale_collections_id_seq OWNED BY public.discount_sale_collections.id;


--
-- Name: discount_sale_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.discount_sale_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.discount_sale_id_seq OWNER TO saleor;

--
-- Name: discount_sale_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.discount_sale_id_seq OWNED BY public.discount_sale.id;


--
-- Name: discount_sale_products; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.discount_sale_products (
    id integer NOT NULL,
    sale_id integer NOT NULL,
    product_id integer NOT NULL
);


ALTER TABLE public.discount_sale_products OWNER TO saleor;

--
-- Name: discount_sale_products_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.discount_sale_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.discount_sale_products_id_seq OWNER TO saleor;

--
-- Name: discount_sale_products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.discount_sale_products_id_seq OWNED BY public.discount_sale_products.id;


--
-- Name: discount_saletranslation; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.discount_saletranslation (
    id integer NOT NULL,
    language_code character varying(10) NOT NULL,
    name character varying(255),
    sale_id integer NOT NULL
);


ALTER TABLE public.discount_saletranslation OWNER TO saleor;

--
-- Name: discount_saletranslation_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.discount_saletranslation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.discount_saletranslation_id_seq OWNER TO saleor;

--
-- Name: discount_saletranslation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.discount_saletranslation_id_seq OWNED BY public.discount_saletranslation.id;


--
-- Name: discount_voucher; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.discount_voucher (
    id integer NOT NULL,
    type character varying(20) NOT NULL,
    name character varying(255),
    code character varying(12) NOT NULL,
    usage_limit integer,
    used integer NOT NULL,
    start_date timestamp with time zone NOT NULL,
    end_date timestamp with time zone,
    discount_value_type character varying(10) NOT NULL,
    discount_value numeric(12,3) NOT NULL,
    min_spent_amount numeric(12,3),
    apply_once_per_order boolean NOT NULL,
    countries character varying(749) NOT NULL,
    min_checkout_items_quantity integer,
    apply_once_per_customer boolean NOT NULL,
    currency character varying(3) NOT NULL,
    CONSTRAINT discount_voucher_min_checkout_items_quantity_check CHECK ((min_checkout_items_quantity >= 0)),
    CONSTRAINT discount_voucher_usage_limit_check CHECK ((usage_limit >= 0)),
    CONSTRAINT discount_voucher_used_check CHECK ((used >= 0))
);


ALTER TABLE public.discount_voucher OWNER TO saleor;

--
-- Name: discount_voucher_categories; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.discount_voucher_categories (
    id integer NOT NULL,
    voucher_id integer NOT NULL,
    category_id integer NOT NULL
);


ALTER TABLE public.discount_voucher_categories OWNER TO saleor;

--
-- Name: discount_voucher_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.discount_voucher_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.discount_voucher_categories_id_seq OWNER TO saleor;

--
-- Name: discount_voucher_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.discount_voucher_categories_id_seq OWNED BY public.discount_voucher_categories.id;


--
-- Name: discount_voucher_collections; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.discount_voucher_collections (
    id integer NOT NULL,
    voucher_id integer NOT NULL,
    collection_id integer NOT NULL
);


ALTER TABLE public.discount_voucher_collections OWNER TO saleor;

--
-- Name: discount_voucher_collections_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.discount_voucher_collections_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.discount_voucher_collections_id_seq OWNER TO saleor;

--
-- Name: discount_voucher_collections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.discount_voucher_collections_id_seq OWNED BY public.discount_voucher_collections.id;


--
-- Name: discount_voucher_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.discount_voucher_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.discount_voucher_id_seq OWNER TO saleor;

--
-- Name: discount_voucher_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.discount_voucher_id_seq OWNED BY public.discount_voucher.id;


--
-- Name: discount_voucher_products; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.discount_voucher_products (
    id integer NOT NULL,
    voucher_id integer NOT NULL,
    product_id integer NOT NULL
);


ALTER TABLE public.discount_voucher_products OWNER TO saleor;

--
-- Name: discount_voucher_products_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.discount_voucher_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.discount_voucher_products_id_seq OWNER TO saleor;

--
-- Name: discount_voucher_products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.discount_voucher_products_id_seq OWNED BY public.discount_voucher_products.id;


--
-- Name: discount_vouchercustomer; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.discount_vouchercustomer (
    id integer NOT NULL,
    customer_email character varying(254) NOT NULL,
    voucher_id integer NOT NULL
);


ALTER TABLE public.discount_vouchercustomer OWNER TO saleor;

--
-- Name: discount_vouchercustomer_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.discount_vouchercustomer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.discount_vouchercustomer_id_seq OWNER TO saleor;

--
-- Name: discount_vouchercustomer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.discount_vouchercustomer_id_seq OWNED BY public.discount_vouchercustomer.id;


--
-- Name: discount_vouchertranslation; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.discount_vouchertranslation (
    id integer NOT NULL,
    language_code character varying(10) NOT NULL,
    name character varying(255),
    voucher_id integer NOT NULL
);


ALTER TABLE public.discount_vouchertranslation OWNER TO saleor;

--
-- Name: discount_vouchertranslation_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.discount_vouchertranslation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.discount_vouchertranslation_id_seq OWNER TO saleor;

--
-- Name: discount_vouchertranslation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.discount_vouchertranslation_id_seq OWNED BY public.discount_vouchertranslation.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO saleor;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO saleor;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO saleor;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.django_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO saleor;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_prices_openexchangerates_conversionrate; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.django_prices_openexchangerates_conversionrate (
    id integer NOT NULL,
    to_currency character varying(3) NOT NULL,
    rate numeric(20,12) NOT NULL,
    modified_at timestamp with time zone NOT NULL
);


ALTER TABLE public.django_prices_openexchangerates_conversionrate OWNER TO saleor;

--
-- Name: django_prices_openexchangerates_conversionrate_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.django_prices_openexchangerates_conversionrate_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_prices_openexchangerates_conversionrate_id_seq OWNER TO saleor;

--
-- Name: django_prices_openexchangerates_conversionrate_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.django_prices_openexchangerates_conversionrate_id_seq OWNED BY public.django_prices_openexchangerates_conversionrate.id;


--
-- Name: django_prices_vatlayer_ratetypes; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.django_prices_vatlayer_ratetypes (
    id integer NOT NULL,
    types text NOT NULL
);


ALTER TABLE public.django_prices_vatlayer_ratetypes OWNER TO saleor;

--
-- Name: django_prices_vatlayer_ratetypes_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.django_prices_vatlayer_ratetypes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_prices_vatlayer_ratetypes_id_seq OWNER TO saleor;

--
-- Name: django_prices_vatlayer_ratetypes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.django_prices_vatlayer_ratetypes_id_seq OWNED BY public.django_prices_vatlayer_ratetypes.id;


--
-- Name: django_prices_vatlayer_vat; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.django_prices_vatlayer_vat (
    id integer NOT NULL,
    country_code character varying(2) NOT NULL,
    data text NOT NULL
);


ALTER TABLE public.django_prices_vatlayer_vat OWNER TO saleor;

--
-- Name: django_prices_vatlayer_vat_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.django_prices_vatlayer_vat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_prices_vatlayer_vat_id_seq OWNER TO saleor;

--
-- Name: django_prices_vatlayer_vat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.django_prices_vatlayer_vat_id_seq OWNED BY public.django_prices_vatlayer_vat.id;


--
-- Name: django_site; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.django_site (
    id integer NOT NULL,
    domain character varying(100) NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.django_site OWNER TO saleor;

--
-- Name: django_site_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.django_site_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_site_id_seq OWNER TO saleor;

--
-- Name: django_site_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.django_site_id_seq OWNED BY public.django_site.id;


--
-- Name: fusion_online_offer; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.fusion_online_offer (
    id integer NOT NULL,
    type character varying(50) NOT NULL,
    lead_time_days integer NOT NULL,
    date_added bigint,
    date_code character varying(50) NOT NULL,
    comment character varying(300) NOT NULL,
    vendor_type character varying(50) NOT NULL,
    vendor_region character varying(50) NOT NULL,
    product_variant_id integer NOT NULL,
    tariff_rate double precision,
    coo character varying(60) NOT NULL
);


ALTER TABLE public.fusion_online_offer OWNER TO saleor;

--
-- Name: fusion_online_offer_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.fusion_online_offer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fusion_online_offer_id_seq OWNER TO saleor;

--
-- Name: fusion_online_offer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.fusion_online_offer_id_seq OWNED BY public.fusion_online_offer.id;


--
-- Name: fusion_online_rfqlineitem; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.fusion_online_rfqlineitem (
    id integer NOT NULL,
    mpn character varying(50) NOT NULL,
    mcode character varying(50) NOT NULL,
    quantity integer NOT NULL,
    target double precision NOT NULL,
    date_code character varying(50) NOT NULL,
    comment character varying(500) NOT NULL,
    cipn character varying(50) NOT NULL,
    commodity_code character varying(50) NOT NULL,
    offer_id integer NOT NULL,
    rfq_submission_id integer NOT NULL
);


ALTER TABLE public.fusion_online_rfqlineitem OWNER TO saleor;

--
-- Name: fusion_online_rfqlineitem_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.fusion_online_rfqlineitem_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fusion_online_rfqlineitem_id_seq OWNER TO saleor;

--
-- Name: fusion_online_rfqlineitem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.fusion_online_rfqlineitem_id_seq OWNED BY public.fusion_online_rfqlineitem.id;


--
-- Name: fusion_online_rfqresponse; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.fusion_online_rfqresponse (
    id integer NOT NULL,
    response character varying(50) NOT NULL,
    mpn character varying(50) NOT NULL,
    mcode character varying(10) NOT NULL,
    quantity integer NOT NULL,
    offer_price double precision NOT NULL,
    date_code character varying(50) NOT NULL,
    comment character varying(300) NOT NULL,
    coo character varying(60) NOT NULL,
    lead_time_days integer NOT NULL,
    offer_id integer NOT NULL,
    line_item_id integer NOT NULL
);


ALTER TABLE public.fusion_online_rfqresponse OWNER TO saleor;

--
-- Name: fusion_online_rfqresponse_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.fusion_online_rfqresponse_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fusion_online_rfqresponse_id_seq OWNER TO saleor;

--
-- Name: fusion_online_rfqresponse_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.fusion_online_rfqresponse_id_seq OWNED BY public.fusion_online_rfqresponse.id;


--
-- Name: fusion_online_rfqsubmission; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.fusion_online_rfqsubmission (
    id integer NOT NULL,
    date_added timestamp with time zone NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.fusion_online_rfqsubmission OWNER TO saleor;

--
-- Name: fusion_online_rfqsubmission_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.fusion_online_rfqsubmission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fusion_online_rfqsubmission_id_seq OWNER TO saleor;

--
-- Name: fusion_online_rfqsubmission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.fusion_online_rfqsubmission_id_seq OWNED BY public.fusion_online_rfqsubmission.id;


--
-- Name: fusion_online_shippingaddress; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.fusion_online_shippingaddress (
    id integer NOT NULL,
    customer_id bigint,
    ship_to_name character varying(256) NOT NULL,
    ship_via character varying(256),
    vat_id character varying(256),
    ship_to_num bigint,
    validation_message character varying(256),
    created timestamp with time zone,
    updated timestamp with time zone,
    address_id integer
);


ALTER TABLE public.fusion_online_shippingaddress OWNER TO saleor;

--
-- Name: fusion_online_shippingaddress_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.fusion_online_shippingaddress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fusion_online_shippingaddress_id_seq OWNER TO saleor;

--
-- Name: fusion_online_shippingaddress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.fusion_online_shippingaddress_id_seq OWNED BY public.fusion_online_shippingaddress.id;


--
-- Name: giftcard_giftcard; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.giftcard_giftcard (
    id integer NOT NULL,
    code character varying(16) NOT NULL,
    created timestamp with time zone NOT NULL,
    start_date date NOT NULL,
    end_date date,
    last_used_on timestamp with time zone,
    is_active boolean NOT NULL,
    initial_balance_amount numeric(12,3) NOT NULL,
    current_balance_amount numeric(12,3) NOT NULL,
    user_id integer,
    currency character varying(3) NOT NULL
);


ALTER TABLE public.giftcard_giftcard OWNER TO saleor;

--
-- Name: giftcard_giftcard_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.giftcard_giftcard_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.giftcard_giftcard_id_seq OWNER TO saleor;

--
-- Name: giftcard_giftcard_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.giftcard_giftcard_id_seq OWNED BY public.giftcard_giftcard.id;


--
-- Name: invoice_invoice; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.invoice_invoice (
    id integer NOT NULL,
    private_metadata jsonb,
    metadata jsonb,
    status character varying(50) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    number character varying(255),
    created timestamp with time zone,
    external_url character varying(2048),
    invoice_file character varying(100) NOT NULL,
    order_id integer,
    message character varying(255)
);


ALTER TABLE public.invoice_invoice OWNER TO saleor;

--
-- Name: invoice_invoice_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.invoice_invoice_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.invoice_invoice_id_seq OWNER TO saleor;

--
-- Name: invoice_invoice_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.invoice_invoice_id_seq OWNED BY public.invoice_invoice.id;


--
-- Name: invoice_invoiceevent; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.invoice_invoiceevent (
    id integer NOT NULL,
    date timestamp with time zone NOT NULL,
    type character varying(255) NOT NULL,
    parameters jsonb NOT NULL,
    invoice_id integer,
    order_id integer,
    user_id integer
);


ALTER TABLE public.invoice_invoiceevent OWNER TO saleor;

--
-- Name: invoice_invoiceevent_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.invoice_invoiceevent_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.invoice_invoiceevent_id_seq OWNER TO saleor;

--
-- Name: invoice_invoiceevent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.invoice_invoiceevent_id_seq OWNED BY public.invoice_invoiceevent.id;


--
-- Name: menu_menu; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.menu_menu (
    id integer NOT NULL,
    name character varying(250) NOT NULL,
    slug character varying(255) NOT NULL
);


ALTER TABLE public.menu_menu OWNER TO saleor;

--
-- Name: menu_menu_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.menu_menu_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.menu_menu_id_seq OWNER TO saleor;

--
-- Name: menu_menu_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.menu_menu_id_seq OWNED BY public.menu_menu.id;


--
-- Name: menu_menuitem; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.menu_menuitem (
    id integer NOT NULL,
    name character varying(128) NOT NULL,
    sort_order integer,
    url character varying(256),
    lft integer NOT NULL,
    rght integer NOT NULL,
    tree_id integer NOT NULL,
    level integer NOT NULL,
    category_id integer,
    collection_id integer,
    menu_id integer NOT NULL,
    page_id integer,
    parent_id integer,
    CONSTRAINT menu_menuitem_level_check CHECK ((level >= 0)),
    CONSTRAINT menu_menuitem_lft_check CHECK ((lft >= 0)),
    CONSTRAINT menu_menuitem_rght_check CHECK ((rght >= 0)),
    CONSTRAINT menu_menuitem_tree_id_check CHECK ((tree_id >= 0))
);


ALTER TABLE public.menu_menuitem OWNER TO saleor;

--
-- Name: menu_menuitem_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.menu_menuitem_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.menu_menuitem_id_seq OWNER TO saleor;

--
-- Name: menu_menuitem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.menu_menuitem_id_seq OWNED BY public.menu_menuitem.id;


--
-- Name: menu_menuitemtranslation; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.menu_menuitemtranslation (
    id integer NOT NULL,
    language_code character varying(10) NOT NULL,
    name character varying(128) NOT NULL,
    menu_item_id integer NOT NULL
);


ALTER TABLE public.menu_menuitemtranslation OWNER TO saleor;

--
-- Name: menu_menuitemtranslation_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.menu_menuitemtranslation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.menu_menuitemtranslation_id_seq OWNER TO saleor;

--
-- Name: menu_menuitemtranslation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.menu_menuitemtranslation_id_seq OWNED BY public.menu_menuitemtranslation.id;


--
-- Name: order_fulfillment; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.order_fulfillment (
    id integer NOT NULL,
    tracking_number character varying(255) NOT NULL,
    created timestamp with time zone NOT NULL,
    order_id integer NOT NULL,
    fulfillment_order integer NOT NULL,
    status character varying(32) NOT NULL,
    metadata jsonb,
    private_metadata jsonb,
    CONSTRAINT order_fulfillment_fulfillment_order_check CHECK ((fulfillment_order >= 0))
);


ALTER TABLE public.order_fulfillment OWNER TO saleor;

--
-- Name: order_fulfillment_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.order_fulfillment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_fulfillment_id_seq OWNER TO saleor;

--
-- Name: order_fulfillment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.order_fulfillment_id_seq OWNED BY public.order_fulfillment.id;


--
-- Name: order_fulfillmentline; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.order_fulfillmentline (
    id integer NOT NULL,
    order_line_id integer NOT NULL,
    quantity integer NOT NULL,
    fulfillment_id integer NOT NULL,
    stock_id integer,
    CONSTRAINT order_fulfillmentline_quantity_81b787d3_check CHECK ((quantity >= 0))
);


ALTER TABLE public.order_fulfillmentline OWNER TO saleor;

--
-- Name: order_fulfillmentline_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.order_fulfillmentline_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_fulfillmentline_id_seq OWNER TO saleor;

--
-- Name: order_fulfillmentline_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.order_fulfillmentline_id_seq OWNED BY public.order_fulfillmentline.id;


--
-- Name: order_order; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.order_order (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    tracking_client_id character varying(36) NOT NULL,
    user_email character varying(254) NOT NULL,
    token character varying(36) NOT NULL,
    billing_address_id integer,
    shipping_address_id integer,
    user_id integer,
    total_net_amount numeric(12,3) NOT NULL,
    discount_amount numeric(12,3) NOT NULL,
    discount_name character varying(255),
    voucher_id integer,
    language_code character varying(35) NOT NULL,
    shipping_price_gross_amount numeric(12,3) NOT NULL,
    total_gross_amount numeric(12,3) NOT NULL,
    shipping_price_net_amount numeric(12,3) NOT NULL,
    status character varying(32) NOT NULL,
    shipping_method_name character varying(255),
    shipping_method_id integer,
    display_gross_prices boolean NOT NULL,
    translated_discount_name character varying(255),
    customer_note text NOT NULL,
    weight double precision NOT NULL,
    checkout_token character varying(36) NOT NULL,
    currency character varying(3) NOT NULL,
    metadata jsonb,
    private_metadata jsonb
);


ALTER TABLE public.order_order OWNER TO saleor;

--
-- Name: order_order_gift_cards; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.order_order_gift_cards (
    id integer NOT NULL,
    order_id integer NOT NULL,
    giftcard_id integer NOT NULL
);


ALTER TABLE public.order_order_gift_cards OWNER TO saleor;

--
-- Name: order_order_gift_cards_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.order_order_gift_cards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_order_gift_cards_id_seq OWNER TO saleor;

--
-- Name: order_order_gift_cards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.order_order_gift_cards_id_seq OWNED BY public.order_order_gift_cards.id;


--
-- Name: order_order_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.order_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_order_id_seq OWNER TO saleor;

--
-- Name: order_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.order_order_id_seq OWNED BY public.order_order.id;


--
-- Name: order_orderline; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.order_orderline (
    id integer NOT NULL,
    product_name character varying(386) NOT NULL,
    product_sku character varying(255) NOT NULL,
    quantity integer NOT NULL,
    unit_price_net_amount numeric(12,3) NOT NULL,
    unit_price_gross_amount numeric(12,3) NOT NULL,
    is_shipping_required boolean NOT NULL,
    order_id integer NOT NULL,
    quantity_fulfilled integer NOT NULL,
    variant_id integer,
    tax_rate numeric(5,2) NOT NULL,
    translated_product_name character varying(386) NOT NULL,
    currency character varying(3) NOT NULL,
    translated_variant_name character varying(255) NOT NULL,
    variant_name character varying(255) NOT NULL
);


ALTER TABLE public.order_orderline OWNER TO saleor;

--
-- Name: order_ordereditem_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.order_ordereditem_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_ordereditem_id_seq OWNER TO saleor;

--
-- Name: order_ordereditem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.order_ordereditem_id_seq OWNED BY public.order_orderline.id;


--
-- Name: order_orderevent; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.order_orderevent (
    id integer NOT NULL,
    date timestamp with time zone NOT NULL,
    type character varying(255) NOT NULL,
    order_id integer NOT NULL,
    user_id integer,
    parameters jsonb NOT NULL
);


ALTER TABLE public.order_orderevent OWNER TO saleor;

--
-- Name: order_orderevent_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.order_orderevent_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_orderevent_id_seq OWNER TO saleor;

--
-- Name: order_orderevent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.order_orderevent_id_seq OWNED BY public.order_orderevent.id;


--
-- Name: page_page; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.page_page (
    id integer NOT NULL,
    slug character varying(255) NOT NULL,
    title character varying(250) NOT NULL,
    content text NOT NULL,
    created timestamp with time zone NOT NULL,
    is_published boolean NOT NULL,
    publication_date date,
    seo_description character varying(300),
    seo_title character varying(70),
    content_json jsonb NOT NULL,
    metadata jsonb,
    private_metadata jsonb
);


ALTER TABLE public.page_page OWNER TO saleor;

--
-- Name: page_page_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.page_page_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.page_page_id_seq OWNER TO saleor;

--
-- Name: page_page_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.page_page_id_seq OWNED BY public.page_page.id;


--
-- Name: page_pagetranslation; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.page_pagetranslation (
    id integer NOT NULL,
    seo_title character varying(70),
    seo_description character varying(300),
    language_code character varying(10) NOT NULL,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    page_id integer NOT NULL,
    content_json jsonb NOT NULL
);


ALTER TABLE public.page_pagetranslation OWNER TO saleor;

--
-- Name: page_pagetranslation_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.page_pagetranslation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.page_pagetranslation_id_seq OWNER TO saleor;

--
-- Name: page_pagetranslation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.page_pagetranslation_id_seq OWNED BY public.page_pagetranslation.id;


--
-- Name: payment_payment; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.payment_payment (
    id integer NOT NULL,
    gateway character varying(255) NOT NULL,
    is_active boolean NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL,
    charge_status character varying(20) NOT NULL,
    billing_first_name character varying(256) NOT NULL,
    billing_last_name character varying(256) NOT NULL,
    billing_company_name character varying(256) NOT NULL,
    billing_address_1 character varying(256) NOT NULL,
    billing_address_2 character varying(256) NOT NULL,
    billing_city character varying(256) NOT NULL,
    billing_city_area character varying(128) NOT NULL,
    billing_postal_code character varying(256) NOT NULL,
    billing_country_code character varying(2) NOT NULL,
    billing_country_area character varying(256) NOT NULL,
    billing_email character varying(254) NOT NULL,
    customer_ip_address inet,
    cc_brand character varying(40) NOT NULL,
    cc_exp_month integer,
    cc_exp_year integer,
    cc_first_digits character varying(6) NOT NULL,
    cc_last_digits character varying(4) NOT NULL,
    extra_data text NOT NULL,
    token character varying(128) NOT NULL,
    currency character varying(3) NOT NULL,
    total numeric(12,3) NOT NULL,
    captured_amount numeric(12,3) NOT NULL,
    checkout_id uuid,
    order_id integer,
    to_confirm boolean NOT NULL,
    payment_method_type character varying(256) NOT NULL,
    return_url character varying(200),
    CONSTRAINT payment_paymentmethod_cc_exp_month_check CHECK ((cc_exp_month >= 0)),
    CONSTRAINT payment_paymentmethod_cc_exp_year_check CHECK ((cc_exp_year >= 0))
);


ALTER TABLE public.payment_payment OWNER TO saleor;

--
-- Name: payment_paymentmethod_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.payment_paymentmethod_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payment_paymentmethod_id_seq OWNER TO saleor;

--
-- Name: payment_paymentmethod_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.payment_paymentmethod_id_seq OWNED BY public.payment_payment.id;


--
-- Name: payment_transaction; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.payment_transaction (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    token character varying(128) NOT NULL,
    kind character varying(25) NOT NULL,
    is_success boolean NOT NULL,
    error character varying(256),
    currency character varying(3) NOT NULL,
    amount numeric(12,3) NOT NULL,
    gateway_response jsonb NOT NULL,
    payment_id integer NOT NULL,
    customer_id character varying(256),
    action_required boolean NOT NULL,
    action_required_data jsonb NOT NULL,
    already_processed boolean NOT NULL,
    searchable_key character varying(256)
);


ALTER TABLE public.payment_transaction OWNER TO saleor;

--
-- Name: payment_transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.payment_transaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payment_transaction_id_seq OWNER TO saleor;

--
-- Name: payment_transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.payment_transaction_id_seq OWNED BY public.payment_transaction.id;


--
-- Name: plugins_pluginconfiguration; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.plugins_pluginconfiguration (
    id integer NOT NULL,
    name character varying(128) NOT NULL,
    description text NOT NULL,
    active boolean NOT NULL,
    configuration jsonb,
    identifier character varying(128) NOT NULL
);


ALTER TABLE public.plugins_pluginconfiguration OWNER TO saleor;

--
-- Name: plugins_pluginconfiguration_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.plugins_pluginconfiguration_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.plugins_pluginconfiguration_id_seq OWNER TO saleor;

--
-- Name: plugins_pluginconfiguration_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.plugins_pluginconfiguration_id_seq OWNED BY public.plugins_pluginconfiguration.id;


--
-- Name: product_assignedproductattribute; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.product_assignedproductattribute (
    id integer NOT NULL,
    product_id integer NOT NULL,
    assignment_id integer NOT NULL
);


ALTER TABLE public.product_assignedproductattribute OWNER TO saleor;

--
-- Name: product_assignedproductattribute_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.product_assignedproductattribute_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_assignedproductattribute_id_seq OWNER TO saleor;

--
-- Name: product_assignedproductattribute_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.product_assignedproductattribute_id_seq OWNED BY public.product_assignedproductattribute.id;


--
-- Name: product_assignedproductattribute_values; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.product_assignedproductattribute_values (
    id integer NOT NULL,
    assignedproductattribute_id integer NOT NULL,
    attributevalue_id integer NOT NULL
);


ALTER TABLE public.product_assignedproductattribute_values OWNER TO saleor;

--
-- Name: product_assignedproductattribute_values_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.product_assignedproductattribute_values_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_assignedproductattribute_values_id_seq OWNER TO saleor;

--
-- Name: product_assignedproductattribute_values_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.product_assignedproductattribute_values_id_seq OWNED BY public.product_assignedproductattribute_values.id;


--
-- Name: product_assignedvariantattribute; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.product_assignedvariantattribute (
    id integer NOT NULL,
    variant_id integer NOT NULL,
    assignment_id integer NOT NULL
);


ALTER TABLE public.product_assignedvariantattribute OWNER TO saleor;

--
-- Name: product_assignedvariantattribute_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.product_assignedvariantattribute_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_assignedvariantattribute_id_seq OWNER TO saleor;

--
-- Name: product_assignedvariantattribute_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.product_assignedvariantattribute_id_seq OWNED BY public.product_assignedvariantattribute.id;


--
-- Name: product_assignedvariantattribute_values; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.product_assignedvariantattribute_values (
    id integer NOT NULL,
    assignedvariantattribute_id integer NOT NULL,
    attributevalue_id integer NOT NULL
);


ALTER TABLE public.product_assignedvariantattribute_values OWNER TO saleor;

--
-- Name: product_assignedvariantattribute_values_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.product_assignedvariantattribute_values_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_assignedvariantattribute_values_id_seq OWNER TO saleor;

--
-- Name: product_assignedvariantattribute_values_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.product_assignedvariantattribute_values_id_seq OWNED BY public.product_assignedvariantattribute_values.id;


--
-- Name: product_attribute; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.product_attribute (
    id integer NOT NULL,
    slug character varying(250) NOT NULL,
    name character varying(255) NOT NULL,
    metadata jsonb,
    private_metadata jsonb,
    input_type character varying(50) NOT NULL,
    available_in_grid boolean NOT NULL,
    visible_in_storefront boolean NOT NULL,
    filterable_in_dashboard boolean NOT NULL,
    filterable_in_storefront boolean NOT NULL,
    value_required boolean NOT NULL,
    storefront_search_position integer NOT NULL,
    is_variant_only boolean NOT NULL
);


ALTER TABLE public.product_attribute OWNER TO saleor;

--
-- Name: product_attributevalue; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.product_attributevalue (
    id integer NOT NULL,
    name character varying(250) NOT NULL,
    attribute_id integer NOT NULL,
    slug character varying(255) NOT NULL,
    sort_order integer,
    value character varying(100) NOT NULL
);


ALTER TABLE public.product_attributevalue OWNER TO saleor;

--
-- Name: product_attributechoicevalue_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.product_attributechoicevalue_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_attributechoicevalue_id_seq OWNER TO saleor;

--
-- Name: product_attributechoicevalue_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.product_attributechoicevalue_id_seq OWNED BY public.product_attributevalue.id;


--
-- Name: product_attributevaluetranslation; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.product_attributevaluetranslation (
    id integer NOT NULL,
    language_code character varying(10) NOT NULL,
    name character varying(100) NOT NULL,
    attribute_value_id integer NOT NULL
);


ALTER TABLE public.product_attributevaluetranslation OWNER TO saleor;

--
-- Name: product_attributechoicevaluetranslation_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.product_attributechoicevaluetranslation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_attributechoicevaluetranslation_id_seq OWNER TO saleor;

--
-- Name: product_attributechoicevaluetranslation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.product_attributechoicevaluetranslation_id_seq OWNED BY public.product_attributevaluetranslation.id;


--
-- Name: product_attributeproduct; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.product_attributeproduct (
    id integer NOT NULL,
    attribute_id integer NOT NULL,
    product_type_id integer NOT NULL,
    sort_order integer
);


ALTER TABLE public.product_attributeproduct OWNER TO saleor;

--
-- Name: product_attributeproduct_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.product_attributeproduct_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_attributeproduct_id_seq OWNER TO saleor;

--
-- Name: product_attributeproduct_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.product_attributeproduct_id_seq OWNED BY public.product_attributeproduct.id;


--
-- Name: product_attributetranslation; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.product_attributetranslation (
    id integer NOT NULL,
    language_code character varying(10) NOT NULL,
    name character varying(100) NOT NULL,
    attribute_id integer NOT NULL
);


ALTER TABLE public.product_attributetranslation OWNER TO saleor;

--
-- Name: product_attributevariant; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.product_attributevariant (
    id integer NOT NULL,
    attribute_id integer NOT NULL,
    product_type_id integer NOT NULL,
    sort_order integer
);


ALTER TABLE public.product_attributevariant OWNER TO saleor;

--
-- Name: product_attributevariant_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.product_attributevariant_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_attributevariant_id_seq OWNER TO saleor;

--
-- Name: product_attributevariant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.product_attributevariant_id_seq OWNED BY public.product_attributevariant.id;


--
-- Name: product_category; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.product_category (
    id integer NOT NULL,
    name character varying(250) NOT NULL,
    slug character varying(255) NOT NULL,
    description text NOT NULL,
    lft integer NOT NULL,
    rght integer NOT NULL,
    tree_id integer NOT NULL,
    level integer NOT NULL,
    parent_id integer,
    background_image character varying(100),
    seo_description character varying(300),
    seo_title character varying(70),
    background_image_alt character varying(128) NOT NULL,
    description_json jsonb NOT NULL,
    metadata jsonb,
    private_metadata jsonb,
    CONSTRAINT product_category_level_check CHECK ((level >= 0)),
    CONSTRAINT product_category_lft_check CHECK ((lft >= 0)),
    CONSTRAINT product_category_rght_check CHECK ((rght >= 0)),
    CONSTRAINT product_category_tree_id_check CHECK ((tree_id >= 0))
);


ALTER TABLE public.product_category OWNER TO saleor;

--
-- Name: product_category_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.product_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_category_id_seq OWNER TO saleor;

--
-- Name: product_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.product_category_id_seq OWNED BY public.product_category.id;


--
-- Name: product_categorytranslation; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.product_categorytranslation (
    id integer NOT NULL,
    seo_title character varying(70),
    seo_description character varying(300),
    language_code character varying(10) NOT NULL,
    name character varying(128) NOT NULL,
    description text NOT NULL,
    category_id integer NOT NULL,
    description_json jsonb NOT NULL
);


ALTER TABLE public.product_categorytranslation OWNER TO saleor;

--
-- Name: product_categorytranslation_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.product_categorytranslation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_categorytranslation_id_seq OWNER TO saleor;

--
-- Name: product_categorytranslation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.product_categorytranslation_id_seq OWNED BY public.product_categorytranslation.id;


--
-- Name: product_collection; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.product_collection (
    id integer NOT NULL,
    name character varying(250) NOT NULL,
    slug character varying(255) NOT NULL,
    background_image character varying(100),
    seo_description character varying(300),
    seo_title character varying(70),
    is_published boolean NOT NULL,
    description text NOT NULL,
    publication_date date,
    background_image_alt character varying(128) NOT NULL,
    description_json jsonb NOT NULL,
    metadata jsonb,
    private_metadata jsonb
);


ALTER TABLE public.product_collection OWNER TO saleor;

--
-- Name: product_collection_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.product_collection_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_collection_id_seq OWNER TO saleor;

--
-- Name: product_collection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.product_collection_id_seq OWNED BY public.product_collection.id;


--
-- Name: product_collectionproduct; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.product_collectionproduct (
    id integer NOT NULL,
    collection_id integer NOT NULL,
    product_id integer NOT NULL,
    sort_order integer
);


ALTER TABLE public.product_collectionproduct OWNER TO saleor;

--
-- Name: product_collection_products_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.product_collection_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_collection_products_id_seq OWNER TO saleor;

--
-- Name: product_collection_products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.product_collection_products_id_seq OWNED BY public.product_collectionproduct.id;


--
-- Name: product_collectiontranslation; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.product_collectiontranslation (
    id integer NOT NULL,
    seo_title character varying(70),
    seo_description character varying(300),
    language_code character varying(10) NOT NULL,
    name character varying(128) NOT NULL,
    collection_id integer NOT NULL,
    description text NOT NULL,
    description_json jsonb NOT NULL
);


ALTER TABLE public.product_collectiontranslation OWNER TO saleor;

--
-- Name: product_collectiontranslation_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.product_collectiontranslation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_collectiontranslation_id_seq OWNER TO saleor;

--
-- Name: product_collectiontranslation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.product_collectiontranslation_id_seq OWNED BY public.product_collectiontranslation.id;


--
-- Name: product_digitalcontent; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.product_digitalcontent (
    id integer NOT NULL,
    use_default_settings boolean NOT NULL,
    automatic_fulfillment boolean NOT NULL,
    content_type character varying(128) NOT NULL,
    content_file character varying(100) NOT NULL,
    max_downloads integer,
    url_valid_days integer,
    product_variant_id integer NOT NULL,
    metadata jsonb,
    private_metadata jsonb
);


ALTER TABLE public.product_digitalcontent OWNER TO saleor;

--
-- Name: product_digitalcontent_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.product_digitalcontent_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_digitalcontent_id_seq OWNER TO saleor;

--
-- Name: product_digitalcontent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.product_digitalcontent_id_seq OWNED BY public.product_digitalcontent.id;


--
-- Name: product_digitalcontenturl; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.product_digitalcontenturl (
    id integer NOT NULL,
    token uuid NOT NULL,
    created timestamp with time zone NOT NULL,
    download_num integer NOT NULL,
    content_id integer NOT NULL,
    line_id integer
);


ALTER TABLE public.product_digitalcontenturl OWNER TO saleor;

--
-- Name: product_digitalcontenturl_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.product_digitalcontenturl_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_digitalcontenturl_id_seq OWNER TO saleor;

--
-- Name: product_digitalcontenturl_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.product_digitalcontenturl_id_seq OWNED BY public.product_digitalcontenturl.id;


--
-- Name: product_product; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.product_product (
    id integer NOT NULL,
    name character varying(250) NOT NULL,
    description text NOT NULL,
    publication_date date,
    updated_at timestamp with time zone,
    product_type_id integer NOT NULL,
    is_published boolean NOT NULL,
    category_id integer,
    seo_description character varying(300),
    seo_title character varying(70),
    charge_taxes boolean NOT NULL,
    weight double precision,
    description_json jsonb NOT NULL,
    metadata jsonb,
    private_metadata jsonb,
    minimal_variant_price_amount numeric(12,3),
    currency character varying(3) NOT NULL,
    slug character varying(255) NOT NULL,
    available_for_purchase date,
    visible_in_listings boolean NOT NULL,
    default_variant_id integer
);


ALTER TABLE public.product_product OWNER TO saleor;

--
-- Name: product_product_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.product_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_product_id_seq OWNER TO saleor;

--
-- Name: product_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.product_product_id_seq OWNED BY public.product_product.id;


--
-- Name: product_productattribute_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.product_productattribute_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_productattribute_id_seq OWNER TO saleor;

--
-- Name: product_productattribute_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.product_productattribute_id_seq OWNED BY public.product_attribute.id;


--
-- Name: product_productattributetranslation_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.product_productattributetranslation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_productattributetranslation_id_seq OWNER TO saleor;

--
-- Name: product_productattributetranslation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.product_productattributetranslation_id_seq OWNED BY public.product_attributetranslation.id;


--
-- Name: product_producttype; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.product_producttype (
    id integer NOT NULL,
    name character varying(250) NOT NULL,
    has_variants boolean NOT NULL,
    is_shipping_required boolean NOT NULL,
    weight double precision NOT NULL,
    is_digital boolean NOT NULL,
    metadata jsonb,
    private_metadata jsonb,
    slug character varying(255) NOT NULL
);


ALTER TABLE public.product_producttype OWNER TO saleor;

--
-- Name: product_productclass_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.product_productclass_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_productclass_id_seq OWNER TO saleor;

--
-- Name: product_productclass_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.product_productclass_id_seq OWNED BY public.product_producttype.id;


--
-- Name: product_productimage; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.product_productimage (
    id integer NOT NULL,
    image character varying(100) NOT NULL,
    ppoi character varying(20) NOT NULL,
    alt character varying(128) NOT NULL,
    sort_order integer,
    product_id integer NOT NULL
);


ALTER TABLE public.product_productimage OWNER TO saleor;

--
-- Name: product_productimage_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.product_productimage_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_productimage_id_seq OWNER TO saleor;

--
-- Name: product_productimage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.product_productimage_id_seq OWNED BY public.product_productimage.id;


--
-- Name: product_producttranslation; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.product_producttranslation (
    id integer NOT NULL,
    seo_title character varying(70),
    seo_description character varying(300),
    language_code character varying(10) NOT NULL,
    name character varying(250) NOT NULL,
    description text NOT NULL,
    product_id integer NOT NULL,
    description_json jsonb NOT NULL
);


ALTER TABLE public.product_producttranslation OWNER TO saleor;

--
-- Name: product_producttranslation_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.product_producttranslation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_producttranslation_id_seq OWNER TO saleor;

--
-- Name: product_producttranslation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.product_producttranslation_id_seq OWNED BY public.product_producttranslation.id;


--
-- Name: product_productvariant; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.product_productvariant (
    id integer NOT NULL,
    sku character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    product_id integer NOT NULL,
    cost_price_amount numeric(12,3),
    track_inventory boolean NOT NULL,
    weight double precision,
    metadata jsonb,
    private_metadata jsonb,
    currency character varying(3),
    price_amount numeric(12,3) NOT NULL,
    sort_order integer
);


ALTER TABLE public.product_productvariant OWNER TO saleor;

--
-- Name: product_productvariant_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.product_productvariant_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_productvariant_id_seq OWNER TO saleor;

--
-- Name: product_productvariant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.product_productvariant_id_seq OWNED BY public.product_productvariant.id;


--
-- Name: product_productvarianttranslation; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.product_productvarianttranslation (
    id integer NOT NULL,
    language_code character varying(10) NOT NULL,
    name character varying(255) NOT NULL,
    product_variant_id integer NOT NULL
);


ALTER TABLE public.product_productvarianttranslation OWNER TO saleor;

--
-- Name: product_productvarianttranslation_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.product_productvarianttranslation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_productvarianttranslation_id_seq OWNER TO saleor;

--
-- Name: product_productvarianttranslation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.product_productvarianttranslation_id_seq OWNED BY public.product_productvarianttranslation.id;


--
-- Name: product_variantimage; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.product_variantimage (
    id integer NOT NULL,
    image_id integer NOT NULL,
    variant_id integer NOT NULL
);


ALTER TABLE public.product_variantimage OWNER TO saleor;

--
-- Name: product_variantimage_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.product_variantimage_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_variantimage_id_seq OWNER TO saleor;

--
-- Name: product_variantimage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.product_variantimage_id_seq OWNED BY public.product_variantimage.id;


--
-- Name: rest_framework_api_key_apikey; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.rest_framework_api_key_apikey (
    id character varying(100) NOT NULL,
    created timestamp with time zone NOT NULL,
    name character varying(50) NOT NULL,
    revoked boolean NOT NULL,
    expiry_date timestamp with time zone,
    hashed_key character varying(100) NOT NULL,
    prefix character varying(8) NOT NULL
);


ALTER TABLE public.rest_framework_api_key_apikey OWNER TO saleor;

--
-- Name: shipping_shippingmethod; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.shipping_shippingmethod (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    maximum_order_price_amount numeric(12,3),
    maximum_order_weight double precision,
    minimum_order_price_amount numeric(12,3),
    minimum_order_weight double precision,
    price_amount numeric(12,3) NOT NULL,
    type character varying(30) NOT NULL,
    shipping_zone_id integer NOT NULL,
    currency character varying(3) NOT NULL
);


ALTER TABLE public.shipping_shippingmethod OWNER TO saleor;

--
-- Name: shipping_shippingmethod_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.shipping_shippingmethod_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.shipping_shippingmethod_id_seq OWNER TO saleor;

--
-- Name: shipping_shippingmethod_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.shipping_shippingmethod_id_seq OWNED BY public.shipping_shippingmethod.id;


--
-- Name: shipping_shippingmethodtranslation; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.shipping_shippingmethodtranslation (
    id integer NOT NULL,
    language_code character varying(10) NOT NULL,
    name character varying(255),
    shipping_method_id integer NOT NULL
);


ALTER TABLE public.shipping_shippingmethodtranslation OWNER TO saleor;

--
-- Name: shipping_shippingmethodtranslation_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.shipping_shippingmethodtranslation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.shipping_shippingmethodtranslation_id_seq OWNER TO saleor;

--
-- Name: shipping_shippingmethodtranslation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.shipping_shippingmethodtranslation_id_seq OWNED BY public.shipping_shippingmethodtranslation.id;


--
-- Name: shipping_shippingzone; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.shipping_shippingzone (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    countries character varying(749) NOT NULL,
    "default" boolean NOT NULL
);


ALTER TABLE public.shipping_shippingzone OWNER TO saleor;

--
-- Name: shipping_shippingzone_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.shipping_shippingzone_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.shipping_shippingzone_id_seq OWNER TO saleor;

--
-- Name: shipping_shippingzone_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.shipping_shippingzone_id_seq OWNED BY public.shipping_shippingzone.id;


--
-- Name: site_authorizationkey; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.site_authorizationkey (
    id integer NOT NULL,
    name character varying(20) NOT NULL,
    key text NOT NULL,
    password text NOT NULL,
    site_settings_id integer NOT NULL
);


ALTER TABLE public.site_authorizationkey OWNER TO saleor;

--
-- Name: site_authorizationkey_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.site_authorizationkey_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.site_authorizationkey_id_seq OWNER TO saleor;

--
-- Name: site_authorizationkey_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.site_authorizationkey_id_seq OWNED BY public.site_authorizationkey.id;


--
-- Name: site_sitesettings; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.site_sitesettings (
    id integer NOT NULL,
    header_text character varying(200) NOT NULL,
    description character varying(500) NOT NULL,
    site_id integer NOT NULL,
    bottom_menu_id integer,
    top_menu_id integer,
    display_gross_prices boolean NOT NULL,
    include_taxes_in_prices boolean NOT NULL,
    charge_taxes_on_shipping boolean NOT NULL,
    track_inventory_by_default boolean NOT NULL,
    homepage_collection_id integer,
    default_weight_unit character varying(10) NOT NULL,
    automatic_fulfillment_digital_products boolean NOT NULL,
    default_digital_max_downloads integer,
    default_digital_url_valid_days integer,
    company_address_id integer,
    default_mail_sender_address character varying(254),
    default_mail_sender_name character varying(78) NOT NULL,
    customer_set_password_url character varying(255)
);


ALTER TABLE public.site_sitesettings OWNER TO saleor;

--
-- Name: site_sitesettings_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.site_sitesettings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.site_sitesettings_id_seq OWNER TO saleor;

--
-- Name: site_sitesettings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.site_sitesettings_id_seq OWNED BY public.site_sitesettings.id;


--
-- Name: site_sitesettingstranslation; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.site_sitesettingstranslation (
    id integer NOT NULL,
    language_code character varying(10) NOT NULL,
    header_text character varying(200) NOT NULL,
    description character varying(500) NOT NULL,
    site_settings_id integer NOT NULL
);


ALTER TABLE public.site_sitesettingstranslation OWNER TO saleor;

--
-- Name: site_sitesettingstranslation_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.site_sitesettingstranslation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.site_sitesettingstranslation_id_seq OWNER TO saleor;

--
-- Name: site_sitesettingstranslation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.site_sitesettingstranslation_id_seq OWNED BY public.site_sitesettingstranslation.id;


--
-- Name: userprofile_address_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.userprofile_address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.userprofile_address_id_seq OWNER TO saleor;

--
-- Name: userprofile_address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.userprofile_address_id_seq OWNED BY public.account_address.id;


--
-- Name: userprofile_user_addresses_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.userprofile_user_addresses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.userprofile_user_addresses_id_seq OWNER TO saleor;

--
-- Name: userprofile_user_addresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.userprofile_user_addresses_id_seq OWNED BY public.account_user_addresses.id;


--
-- Name: userprofile_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.userprofile_user_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.userprofile_user_groups_id_seq OWNER TO saleor;

--
-- Name: userprofile_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.userprofile_user_groups_id_seq OWNED BY public.account_user_groups.id;


--
-- Name: userprofile_user_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.userprofile_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.userprofile_user_id_seq OWNER TO saleor;

--
-- Name: userprofile_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.userprofile_user_id_seq OWNED BY public.account_user.id;


--
-- Name: userprofile_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.userprofile_user_user_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.userprofile_user_user_permissions_id_seq OWNER TO saleor;

--
-- Name: userprofile_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.userprofile_user_user_permissions_id_seq OWNED BY public.account_user_user_permissions.id;


--
-- Name: warehouse_allocation; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.warehouse_allocation (
    id integer NOT NULL,
    quantity_allocated integer NOT NULL,
    order_line_id integer NOT NULL,
    stock_id integer NOT NULL,
    CONSTRAINT warehouse_allocation_quantity_allocated_check CHECK ((quantity_allocated >= 0))
);


ALTER TABLE public.warehouse_allocation OWNER TO saleor;

--
-- Name: warehouse_allocation_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.warehouse_allocation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.warehouse_allocation_id_seq OWNER TO saleor;

--
-- Name: warehouse_allocation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.warehouse_allocation_id_seq OWNED BY public.warehouse_allocation.id;


--
-- Name: warehouse_stock; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.warehouse_stock (
    id integer NOT NULL,
    quantity integer NOT NULL,
    product_variant_id integer NOT NULL,
    warehouse_id uuid NOT NULL,
    CONSTRAINT warehouse_stock_quantity_check CHECK ((quantity >= 0))
);


ALTER TABLE public.warehouse_stock OWNER TO saleor;

--
-- Name: warehouse_stock_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.warehouse_stock_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.warehouse_stock_id_seq OWNER TO saleor;

--
-- Name: warehouse_stock_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.warehouse_stock_id_seq OWNED BY public.warehouse_stock.id;


--
-- Name: warehouse_warehouse; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.warehouse_warehouse (
    id uuid NOT NULL,
    name character varying(250) NOT NULL,
    company_name character varying(255) NOT NULL,
    email character varying(254) NOT NULL,
    address_id integer NOT NULL,
    slug character varying(255) NOT NULL
);


ALTER TABLE public.warehouse_warehouse OWNER TO saleor;

--
-- Name: warehouse_warehouse_shipping_zones; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.warehouse_warehouse_shipping_zones (
    id integer NOT NULL,
    warehouse_id uuid NOT NULL,
    shippingzone_id integer NOT NULL
);


ALTER TABLE public.warehouse_warehouse_shipping_zones OWNER TO saleor;

--
-- Name: warehouse_warehouse_shipping_zones_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.warehouse_warehouse_shipping_zones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.warehouse_warehouse_shipping_zones_id_seq OWNER TO saleor;

--
-- Name: warehouse_warehouse_shipping_zones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.warehouse_warehouse_shipping_zones_id_seq OWNED BY public.warehouse_warehouse_shipping_zones.id;


--
-- Name: webhook_webhook; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.webhook_webhook (
    id integer NOT NULL,
    target_url character varying(255) NOT NULL,
    is_active boolean NOT NULL,
    secret_key character varying(255),
    app_id integer NOT NULL,
    name character varying(255)
);


ALTER TABLE public.webhook_webhook OWNER TO saleor;

--
-- Name: webhook_webhook_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.webhook_webhook_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.webhook_webhook_id_seq OWNER TO saleor;

--
-- Name: webhook_webhook_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.webhook_webhook_id_seq OWNED BY public.webhook_webhook.id;


--
-- Name: webhook_webhookevent; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.webhook_webhookevent (
    id integer NOT NULL,
    event_type character varying(128) NOT NULL,
    webhook_id integer NOT NULL
);


ALTER TABLE public.webhook_webhookevent OWNER TO saleor;

--
-- Name: webhook_webhookevent_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.webhook_webhookevent_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.webhook_webhookevent_id_seq OWNER TO saleor;

--
-- Name: webhook_webhookevent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.webhook_webhookevent_id_seq OWNED BY public.webhook_webhookevent.id;


--
-- Name: wishlist_wishlist; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.wishlist_wishlist (
    id integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    token uuid NOT NULL,
    user_id integer
);


ALTER TABLE public.wishlist_wishlist OWNER TO saleor;

--
-- Name: wishlist_wishlist_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.wishlist_wishlist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.wishlist_wishlist_id_seq OWNER TO saleor;

--
-- Name: wishlist_wishlist_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.wishlist_wishlist_id_seq OWNED BY public.wishlist_wishlist.id;


--
-- Name: wishlist_wishlistitem; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.wishlist_wishlistitem (
    id integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    product_id integer NOT NULL,
    wishlist_id integer NOT NULL
);


ALTER TABLE public.wishlist_wishlistitem OWNER TO saleor;

--
-- Name: wishlist_wishlistitem_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.wishlist_wishlistitem_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.wishlist_wishlistitem_id_seq OWNER TO saleor;

--
-- Name: wishlist_wishlistitem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.wishlist_wishlistitem_id_seq OWNED BY public.wishlist_wishlistitem.id;


--
-- Name: wishlist_wishlistitem_variants; Type: TABLE; Schema: public; Owner: saleor
--

CREATE TABLE public.wishlist_wishlistitem_variants (
    id integer NOT NULL,
    wishlistitem_id integer NOT NULL,
    productvariant_id integer NOT NULL
);


ALTER TABLE public.wishlist_wishlistitem_variants OWNER TO saleor;

--
-- Name: wishlist_wishlistitem_variants_id_seq; Type: SEQUENCE; Schema: public; Owner: saleor
--

CREATE SEQUENCE public.wishlist_wishlistitem_variants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.wishlist_wishlistitem_variants_id_seq OWNER TO saleor;

--
-- Name: wishlist_wishlistitem_variants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saleor
--

ALTER SEQUENCE public.wishlist_wishlistitem_variants_id_seq OWNED BY public.wishlist_wishlistitem_variants.id;


--
-- Name: account_address id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_address ALTER COLUMN id SET DEFAULT nextval('public.userprofile_address_id_seq'::regclass);


--
-- Name: account_customerevent id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_customerevent ALTER COLUMN id SET DEFAULT nextval('public.account_customerevent_id_seq'::regclass);


--
-- Name: account_customernote id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_customernote ALTER COLUMN id SET DEFAULT nextval('public.account_customernote_id_seq'::regclass);


--
-- Name: account_staffnotificationrecipient id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_staffnotificationrecipient ALTER COLUMN id SET DEFAULT nextval('public.account_staffnotificationrecipient_id_seq'::regclass);


--
-- Name: account_user id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_user ALTER COLUMN id SET DEFAULT nextval('public.userprofile_user_id_seq'::regclass);


--
-- Name: account_user_addresses id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_user_addresses ALTER COLUMN id SET DEFAULT nextval('public.userprofile_user_addresses_id_seq'::regclass);


--
-- Name: account_user_groups id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_user_groups ALTER COLUMN id SET DEFAULT nextval('public.userprofile_user_groups_id_seq'::regclass);


--
-- Name: account_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.userprofile_user_user_permissions_id_seq'::regclass);


--
-- Name: app_app id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.app_app ALTER COLUMN id SET DEFAULT nextval('public.account_serviceaccount_id_seq'::regclass);


--
-- Name: app_app_permissions id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.app_app_permissions ALTER COLUMN id SET DEFAULT nextval('public.account_serviceaccount_permissions_id_seq'::regclass);


--
-- Name: app_appinstallation id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.app_appinstallation ALTER COLUMN id SET DEFAULT nextval('public.app_appinstallation_id_seq'::regclass);


--
-- Name: app_appinstallation_permissions id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.app_appinstallation_permissions ALTER COLUMN id SET DEFAULT nextval('public.app_appinstallation_permissions_id_seq'::regclass);


--
-- Name: app_apptoken id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.app_apptoken ALTER COLUMN id SET DEFAULT nextval('public.account_serviceaccounttoken_id_seq'::regclass);


--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: checkout_checkout_gift_cards id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.checkout_checkout_gift_cards ALTER COLUMN id SET DEFAULT nextval('public.checkout_checkout_gift_cards_id_seq'::regclass);


--
-- Name: checkout_checkoutline id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.checkout_checkoutline ALTER COLUMN id SET DEFAULT nextval('public.cart_cartline_id_seq'::regclass);


--
-- Name: csv_exportevent id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.csv_exportevent ALTER COLUMN id SET DEFAULT nextval('public.csv_exportevent_id_seq'::regclass);


--
-- Name: csv_exportfile id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.csv_exportfile ALTER COLUMN id SET DEFAULT nextval('public.csv_exportfile_id_seq'::regclass);


--
-- Name: discount_sale id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_sale ALTER COLUMN id SET DEFAULT nextval('public.discount_sale_id_seq'::regclass);


--
-- Name: discount_sale_categories id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_sale_categories ALTER COLUMN id SET DEFAULT nextval('public.discount_sale_categories_id_seq'::regclass);


--
-- Name: discount_sale_collections id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_sale_collections ALTER COLUMN id SET DEFAULT nextval('public.discount_sale_collections_id_seq'::regclass);


--
-- Name: discount_sale_products id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_sale_products ALTER COLUMN id SET DEFAULT nextval('public.discount_sale_products_id_seq'::regclass);


--
-- Name: discount_saletranslation id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_saletranslation ALTER COLUMN id SET DEFAULT nextval('public.discount_saletranslation_id_seq'::regclass);


--
-- Name: discount_voucher id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_voucher ALTER COLUMN id SET DEFAULT nextval('public.discount_voucher_id_seq'::regclass);


--
-- Name: discount_voucher_categories id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_voucher_categories ALTER COLUMN id SET DEFAULT nextval('public.discount_voucher_categories_id_seq'::regclass);


--
-- Name: discount_voucher_collections id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_voucher_collections ALTER COLUMN id SET DEFAULT nextval('public.discount_voucher_collections_id_seq'::regclass);


--
-- Name: discount_voucher_products id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_voucher_products ALTER COLUMN id SET DEFAULT nextval('public.discount_voucher_products_id_seq'::regclass);


--
-- Name: discount_vouchercustomer id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_vouchercustomer ALTER COLUMN id SET DEFAULT nextval('public.discount_vouchercustomer_id_seq'::regclass);


--
-- Name: discount_vouchertranslation id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_vouchertranslation ALTER COLUMN id SET DEFAULT nextval('public.discount_vouchertranslation_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Name: django_prices_openexchangerates_conversionrate id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.django_prices_openexchangerates_conversionrate ALTER COLUMN id SET DEFAULT nextval('public.django_prices_openexchangerates_conversionrate_id_seq'::regclass);


--
-- Name: django_prices_vatlayer_ratetypes id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.django_prices_vatlayer_ratetypes ALTER COLUMN id SET DEFAULT nextval('public.django_prices_vatlayer_ratetypes_id_seq'::regclass);


--
-- Name: django_prices_vatlayer_vat id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.django_prices_vatlayer_vat ALTER COLUMN id SET DEFAULT nextval('public.django_prices_vatlayer_vat_id_seq'::regclass);


--
-- Name: django_site id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.django_site ALTER COLUMN id SET DEFAULT nextval('public.django_site_id_seq'::regclass);


--
-- Name: fusion_online_offer id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.fusion_online_offer ALTER COLUMN id SET DEFAULT nextval('public.fusion_online_offer_id_seq'::regclass);


--
-- Name: fusion_online_rfqlineitem id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.fusion_online_rfqlineitem ALTER COLUMN id SET DEFAULT nextval('public.fusion_online_rfqlineitem_id_seq'::regclass);


--
-- Name: fusion_online_rfqresponse id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.fusion_online_rfqresponse ALTER COLUMN id SET DEFAULT nextval('public.fusion_online_rfqresponse_id_seq'::regclass);


--
-- Name: fusion_online_rfqsubmission id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.fusion_online_rfqsubmission ALTER COLUMN id SET DEFAULT nextval('public.fusion_online_rfqsubmission_id_seq'::regclass);


--
-- Name: fusion_online_shippingaddress id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.fusion_online_shippingaddress ALTER COLUMN id SET DEFAULT nextval('public.fusion_online_shippingaddress_id_seq'::regclass);


--
-- Name: giftcard_giftcard id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.giftcard_giftcard ALTER COLUMN id SET DEFAULT nextval('public.giftcard_giftcard_id_seq'::regclass);


--
-- Name: invoice_invoice id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.invoice_invoice ALTER COLUMN id SET DEFAULT nextval('public.invoice_invoice_id_seq'::regclass);


--
-- Name: invoice_invoiceevent id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.invoice_invoiceevent ALTER COLUMN id SET DEFAULT nextval('public.invoice_invoiceevent_id_seq'::regclass);


--
-- Name: menu_menu id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.menu_menu ALTER COLUMN id SET DEFAULT nextval('public.menu_menu_id_seq'::regclass);


--
-- Name: menu_menuitem id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.menu_menuitem ALTER COLUMN id SET DEFAULT nextval('public.menu_menuitem_id_seq'::regclass);


--
-- Name: menu_menuitemtranslation id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.menu_menuitemtranslation ALTER COLUMN id SET DEFAULT nextval('public.menu_menuitemtranslation_id_seq'::regclass);


--
-- Name: order_fulfillment id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.order_fulfillment ALTER COLUMN id SET DEFAULT nextval('public.order_fulfillment_id_seq'::regclass);


--
-- Name: order_fulfillmentline id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.order_fulfillmentline ALTER COLUMN id SET DEFAULT nextval('public.order_fulfillmentline_id_seq'::regclass);


--
-- Name: order_order id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.order_order ALTER COLUMN id SET DEFAULT nextval('public.order_order_id_seq'::regclass);


--
-- Name: order_order_gift_cards id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.order_order_gift_cards ALTER COLUMN id SET DEFAULT nextval('public.order_order_gift_cards_id_seq'::regclass);


--
-- Name: order_orderevent id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.order_orderevent ALTER COLUMN id SET DEFAULT nextval('public.order_orderevent_id_seq'::regclass);


--
-- Name: order_orderline id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.order_orderline ALTER COLUMN id SET DEFAULT nextval('public.order_ordereditem_id_seq'::regclass);


--
-- Name: page_page id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.page_page ALTER COLUMN id SET DEFAULT nextval('public.page_page_id_seq'::regclass);


--
-- Name: page_pagetranslation id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.page_pagetranslation ALTER COLUMN id SET DEFAULT nextval('public.page_pagetranslation_id_seq'::regclass);


--
-- Name: payment_payment id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.payment_payment ALTER COLUMN id SET DEFAULT nextval('public.payment_paymentmethod_id_seq'::regclass);


--
-- Name: payment_transaction id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.payment_transaction ALTER COLUMN id SET DEFAULT nextval('public.payment_transaction_id_seq'::regclass);


--
-- Name: plugins_pluginconfiguration id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.plugins_pluginconfiguration ALTER COLUMN id SET DEFAULT nextval('public.plugins_pluginconfiguration_id_seq'::regclass);


--
-- Name: product_assignedproductattribute id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_assignedproductattribute ALTER COLUMN id SET DEFAULT nextval('public.product_assignedproductattribute_id_seq'::regclass);


--
-- Name: product_assignedproductattribute_values id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_assignedproductattribute_values ALTER COLUMN id SET DEFAULT nextval('public.product_assignedproductattribute_values_id_seq'::regclass);


--
-- Name: product_assignedvariantattribute id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_assignedvariantattribute ALTER COLUMN id SET DEFAULT nextval('public.product_assignedvariantattribute_id_seq'::regclass);


--
-- Name: product_assignedvariantattribute_values id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_assignedvariantattribute_values ALTER COLUMN id SET DEFAULT nextval('public.product_assignedvariantattribute_values_id_seq'::regclass);


--
-- Name: product_attribute id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_attribute ALTER COLUMN id SET DEFAULT nextval('public.product_productattribute_id_seq'::regclass);


--
-- Name: product_attributeproduct id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_attributeproduct ALTER COLUMN id SET DEFAULT nextval('public.product_attributeproduct_id_seq'::regclass);


--
-- Name: product_attributetranslation id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_attributetranslation ALTER COLUMN id SET DEFAULT nextval('public.product_productattributetranslation_id_seq'::regclass);


--
-- Name: product_attributevalue id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_attributevalue ALTER COLUMN id SET DEFAULT nextval('public.product_attributechoicevalue_id_seq'::regclass);


--
-- Name: product_attributevaluetranslation id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_attributevaluetranslation ALTER COLUMN id SET DEFAULT nextval('public.product_attributechoicevaluetranslation_id_seq'::regclass);


--
-- Name: product_attributevariant id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_attributevariant ALTER COLUMN id SET DEFAULT nextval('public.product_attributevariant_id_seq'::regclass);


--
-- Name: product_category id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_category ALTER COLUMN id SET DEFAULT nextval('public.product_category_id_seq'::regclass);


--
-- Name: product_categorytranslation id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_categorytranslation ALTER COLUMN id SET DEFAULT nextval('public.product_categorytranslation_id_seq'::regclass);


--
-- Name: product_collection id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_collection ALTER COLUMN id SET DEFAULT nextval('public.product_collection_id_seq'::regclass);


--
-- Name: product_collectionproduct id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_collectionproduct ALTER COLUMN id SET DEFAULT nextval('public.product_collection_products_id_seq'::regclass);


--
-- Name: product_collectiontranslation id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_collectiontranslation ALTER COLUMN id SET DEFAULT nextval('public.product_collectiontranslation_id_seq'::regclass);


--
-- Name: product_digitalcontent id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_digitalcontent ALTER COLUMN id SET DEFAULT nextval('public.product_digitalcontent_id_seq'::regclass);


--
-- Name: product_digitalcontenturl id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_digitalcontenturl ALTER COLUMN id SET DEFAULT nextval('public.product_digitalcontenturl_id_seq'::regclass);


--
-- Name: product_product id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_product ALTER COLUMN id SET DEFAULT nextval('public.product_product_id_seq'::regclass);


--
-- Name: product_productimage id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_productimage ALTER COLUMN id SET DEFAULT nextval('public.product_productimage_id_seq'::regclass);


--
-- Name: product_producttranslation id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_producttranslation ALTER COLUMN id SET DEFAULT nextval('public.product_producttranslation_id_seq'::regclass);


--
-- Name: product_producttype id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_producttype ALTER COLUMN id SET DEFAULT nextval('public.product_productclass_id_seq'::regclass);


--
-- Name: product_productvariant id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_productvariant ALTER COLUMN id SET DEFAULT nextval('public.product_productvariant_id_seq'::regclass);


--
-- Name: product_productvarianttranslation id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_productvarianttranslation ALTER COLUMN id SET DEFAULT nextval('public.product_productvarianttranslation_id_seq'::regclass);


--
-- Name: product_variantimage id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_variantimage ALTER COLUMN id SET DEFAULT nextval('public.product_variantimage_id_seq'::regclass);


--
-- Name: shipping_shippingmethod id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.shipping_shippingmethod ALTER COLUMN id SET DEFAULT nextval('public.shipping_shippingmethod_id_seq'::regclass);


--
-- Name: shipping_shippingmethodtranslation id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.shipping_shippingmethodtranslation ALTER COLUMN id SET DEFAULT nextval('public.shipping_shippingmethodtranslation_id_seq'::regclass);


--
-- Name: shipping_shippingzone id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.shipping_shippingzone ALTER COLUMN id SET DEFAULT nextval('public.shipping_shippingzone_id_seq'::regclass);


--
-- Name: site_authorizationkey id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.site_authorizationkey ALTER COLUMN id SET DEFAULT nextval('public.site_authorizationkey_id_seq'::regclass);


--
-- Name: site_sitesettings id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.site_sitesettings ALTER COLUMN id SET DEFAULT nextval('public.site_sitesettings_id_seq'::regclass);


--
-- Name: site_sitesettingstranslation id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.site_sitesettingstranslation ALTER COLUMN id SET DEFAULT nextval('public.site_sitesettingstranslation_id_seq'::regclass);


--
-- Name: warehouse_allocation id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.warehouse_allocation ALTER COLUMN id SET DEFAULT nextval('public.warehouse_allocation_id_seq'::regclass);


--
-- Name: warehouse_stock id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.warehouse_stock ALTER COLUMN id SET DEFAULT nextval('public.warehouse_stock_id_seq'::regclass);


--
-- Name: warehouse_warehouse_shipping_zones id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.warehouse_warehouse_shipping_zones ALTER COLUMN id SET DEFAULT nextval('public.warehouse_warehouse_shipping_zones_id_seq'::regclass);


--
-- Name: webhook_webhook id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.webhook_webhook ALTER COLUMN id SET DEFAULT nextval('public.webhook_webhook_id_seq'::regclass);


--
-- Name: webhook_webhookevent id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.webhook_webhookevent ALTER COLUMN id SET DEFAULT nextval('public.webhook_webhookevent_id_seq'::regclass);


--
-- Name: wishlist_wishlist id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.wishlist_wishlist ALTER COLUMN id SET DEFAULT nextval('public.wishlist_wishlist_id_seq'::regclass);


--
-- Name: wishlist_wishlistitem id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.wishlist_wishlistitem ALTER COLUMN id SET DEFAULT nextval('public.wishlist_wishlistitem_id_seq'::regclass);


--
-- Name: wishlist_wishlistitem_variants id; Type: DEFAULT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.wishlist_wishlistitem_variants ALTER COLUMN id SET DEFAULT nextval('public.wishlist_wishlistitem_variants_id_seq'::regclass);


--
-- Data for Name: account_address; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.account_address (id, first_name, last_name, company_name, street_address_1, street_address_2, city, postal_code, country, country_area, phone, city_area) FROM stdin;
1	George	Burton		027 Weaver Isle Suite 892		Hatfieldton	47301	US	IN		
2	George	Burton		027 Weaver Isle Suite 892		Hatfieldton	47301	US	IN		
3	Samantha	Hardy		2913 Frye Gateway		Millerport	57612	US	SD		
4	Nicholas	Nelson		53909 Madeline Estate Suite 716		South Sheriton	59120	US	MT		
5	Maeghan	Provencher		191 Maverick St.	Apt. 1L	BOSTON	02128	US	MA	+16033614198	
6	Maeghan	Provencher		191 Maverick St.	Apt. 1L	BOSTON	02128	US	MA	+16033614198	
7	Maeghan	Provencher		191 Maverick St.	Apt. 1L	BOSTON	02128	US	MA	+16033614198	
8	Maeghan	Provencher		191 Maverick St.	Apt. 1L	BOSTON	02128	US	MA	+16033614198	
9	Maeghan	Provencher		191 Maverick St.	Apt. 1L	BOSTON	02128	US	MA	+16033614198	
10	Maeghan	Provencher		191 Maverick St.	Apt. 1L	BOSTON	02128	US	MA	+16033614198	
11				123 test st.		BOSTON	02128	US	MA		
13	Jane	Doe	ACME	123 Main St.		BOSTON	02124	US	MA	+18005555555	
14	Jane	Doe	ACME	123 Main St.		BOSTON	02124	US	MA	+18005555555	
15	Jane	Doe	ACME	123 Main St.		BOSTON	02124	US	MA	+18005555555	
16	Jane	Doe	ACME	123 Main St.		BOSTON	02124	US	MA	+18005555555	
17	Jane	Doe	ACME	123 Main St.		BOSTON	02124	US	MA	+18005555555	
18	Jane	Doe	ACME	123 Main St.		BOSTON	02124	US	MA	+18005555555	
19	Jane	Doe	ACME	123 Main St.		BOSTON	02124	US	MA	+18005555555	
20	Jane	Doe	ACME	123 Main St.		BOSTON	02124	US	MA	+18005555555	
21	Jane	Doe	ACME	123 Main St.		BOSTON	02124	US	MA	+18005555555	
22			Fusion Worldwide	1 Marina Park Drive		BOSTON	02210	US	MA		
23	Jane	Doe	ACME	123 Main St.		BOSTON	02124	US	MA	+18005555555	
24	Jane	Doe	ACME	123 Main St.		BOSTON	02124	US	MA	+18005555555	
25	Jane	Doe	ACME	123 Main St.		BOSTON	02124	US	MA	+18005555555	
26	Jane	Doe	ACME	123 Main St.		BOSTON	02124	US	MA	+18005555555	
27	Jane	Doe	ACME	123 Main St.		BOSTON	02124	US	MA	+18005555555	
12	Jane	Doe	ACME	123 Main St.		BOSTON	02124	US	MA	+18005555555	
28	Jane	Doe	ACME	123 Main St.		BOSTON	02124	US	MA	+18005555555	
29	Alex	Vallejo	My Company	180 NE 29th St	Apt 1904	Miami	33137	US	FL	+19782704786	
63	Alex	Vallejo	My Company	180 NE 29th St	Apt 1904	Miami	33137	US	FL	+19782704786	
64	Alex	Vallejo	My Company	180 NE 29th St	Apt 1904	Miami	33137	US	FL	+19782704786	
65	Alex	Vallejo	My Company	180 NE 29th St	Apt 1904	Miami	33137	US	FL	+19782704786	
66	Alex	Vallejo	My Company	180 NE 29th St	Apt 1904	Miami	33137	US	FL	+19782704786	
\.


--
-- Data for Name: account_customerevent; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.account_customerevent (id, date, type, parameters, order_id, user_id) FROM stdin;
1	2021-06-22 17:00:09.731678+00	account_created	{}	\N	4
2	2021-06-22 17:05:55.565399+00	account_created	{}	\N	5
3	2021-06-22 18:17:53.451726+00	password_reset_link_sent	{}	\N	5
4	2021-06-23 19:50:31.629559+00	account_created	{}	\N	6
5	2021-06-23 19:57:34.263932+00	account_created	{}	\N	7
6	2021-06-24 18:20:40.829575+00	account_created	{}	\N	8
7	2021-06-24 19:21:16.497892+00	account_created	{}	\N	9
8	2021-06-24 19:55:10.659702+00	account_created	{}	\N	10
9	2021-06-25 14:26:50.18051+00	account_created	{}	\N	11
10	2021-06-25 19:30:10.497483+00	account_created	{}	\N	12
11	2021-06-29 19:31:48.831473+00	password_changed	{}	\N	5
12	2021-06-29 20:22:55.266287+00	password_changed	{}	\N	5
13	2021-06-29 20:47:02.843828+00	password_changed	{}	\N	5
14	2021-06-29 21:03:45.970111+00	password_changed	{}	\N	5
15	2021-06-30 13:46:37.555866+00	password_changed	{}	\N	5
16	2021-06-30 13:50:42.410487+00	password_changed	{}	\N	5
17	2021-06-30 18:35:15.221537+00	password_changed	{}	\N	5
18	2021-07-21 18:48:54.341515+00	placed_order	{}	3	5
19	2021-07-21 18:52:46.759356+00	placed_order	{}	4	5
20	2021-07-21 18:55:54.142307+00	placed_order	{}	5	5
21	2021-07-23 16:35:30.424467+00	email_assigned	{"message": "rc-admin-sandbox@36creative.com"}	\N	1
22	2021-07-23 16:36:50.811221+00	password_changed	{}	\N	5
23	2021-07-29 15:31:01.434974+00	email_assigned	{"message": "customer@example.com"}	\N	1
24	2021-07-29 19:15:17.463693+00	password_changed	{}	\N	1
25	2021-07-29 19:15:17.488184+00	password_changed	{}	\N	1
26	2021-07-29 20:27:42.91952+00	password_changed	{}	\N	5
27	2021-08-11 15:44:18.336799+00	placed_order	{}	6	5
28	2021-08-11 17:04:55.692353+00	placed_order	{}	7	5
\.


--
-- Data for Name: account_customernote; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.account_customernote (id, date, content, is_public, customer_id, user_id) FROM stdin;
\.


--
-- Data for Name: account_staffnotificationrecipient; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.account_staffnotificationrecipient (id, staff_email, active, user_id) FROM stdin;
\.


--
-- Data for Name: account_user; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.account_user (id, is_superuser, email, is_staff, is_active, password, date_joined, last_login, default_billing_address_id, default_shipping_address_id, note, first_name, last_name, avatar, private_metadata, metadata, jwt_token_key) FROM stdin;
2	f	samantha.hardy@example.com	t	t	pbkdf2_sha256$216000$BYG0cje7jm4k$4oClWOSHwFIguqpyfstyD44yVa05zGaVFBhL/hh9ZnA=	2021-05-19 15:49:25.684364+00	\N	3	3	\N	Samantha	Hardy		{}	{}	2Vcvm2mC0kll
3	f	nicholas.nelson@example.com	t	t	pbkdf2_sha256$216000$7hUgpMhlxgtq$OpsniCUxUTmUqmjRrsbhqnXcu+8UM523zQiMktiTr1s=	2021-05-19 15:49:25.795732+00	\N	4	4	\N	Nicholas	Nelson		{}	{}	xR2SUxE8VhMk
12	f	test6@test.com	f	t	pbkdf2_sha256$216000$0xhARmJk724y$E71nyzvuxXFTYg6S57khV5fqLXqC4cALWG+T8QrarM4=	2021-06-25 19:30:10.352771+00	2021-06-25 19:30:34.071893+00	\N	\N	\N				{}	{}	YKPlJVsdtksf
6	f	test@test.com	f	t	pbkdf2_sha256$216000$98hum632Vr3k$cb3Rrv3Ero7bmO6zMWtZQsiWkv2mWob9UgSV2T21Ujs=	2021-06-23 19:50:31.314872+00	2021-06-24 18:19:05.574359+00	\N	\N	\N				{}	{}	09Kf0cCTz9M7
11	f	test5@test.com	f	t	pbkdf2_sha256$216000$heJlDRr9QOH3$UCD/S8yE8//lRhbDmgwcsuWUf0sP7yTsEk5sRXBDKqI=	2021-06-25 14:26:50.031077+00	2021-06-25 14:27:28.150407+00	\N	\N	\N				{}	{}	onk8A1n97PYz
4	f	admin@bowst.com	f	f	pbkdf2_sha256$216000$8dwxa4qPFnbo$d14QNM7cxLCVFrSH2QwCdLDq9GmKqNnqcNLvZq5RJto=	2021-06-22 17:00:09.434333+00	\N	\N	\N	\N				{}	{}	GRRIv5ptFkEd
10	f	test4@test.com	f	t	pbkdf2_sha256$216000$44wZpVYnVpm7$0FButqCDAwUnIS8TNq0lgBr8C3Mc/37XZG3/Q6Xo4ss=	2021-06-24 19:55:10.539369+00	2021-06-24 19:56:08.270478+00	\N	\N	\N				{}	{}	Z5yQyIxxbQYX
5	f	customer@example.com	f	t	pbkdf2_sha256$216000$sjeT7lQ8368f$nhKGUhuuUkayQqhrmmIUd0oYKCm6fhHI/KZMcGtbi7A=	2021-06-22 17:05:55.441801+00	2021-07-29 20:27:52.040888+00	12	12	\N	Jane	Doe		{}	{}	5zjUmf5N9P7K
7	f	testing@test.com	f	f	pbkdf2_sha256$216000$O3GbrZlGB0Lj$rX3CvqZOGO9tdXdHmZQO6rKTtbXDpcNCC49awo7QbDM=	2021-06-23 19:57:34.139287+00	\N	\N	\N	\N				{}	{}	NjE4muMwgs4u
1	t	rc-admin-sandbox@36creative.com	t	t	pbkdf2_sha256$216000$oO09p82RDWTd$UOn/ydXH4lEL5/7WNzB0d93Trs09Rrhn+D0yepO7GmA=	2021-05-19 15:49:25.493381+00	2021-08-11 15:32:41.657789+00	2	2	\N	RocketChips	Admin		{}	{}	05Sjy5bUYQS3
8	f	test2@test.com	f	t	pbkdf2_sha256$216000$6g7mfxc0v4ew$tWixtWwgkQuA/5z0Xi84LyxbS7XhSiyacf+aFCWPj4I=	2021-06-24 18:20:40.669425+00	2021-06-24 18:21:48.249775+00	\N	\N	\N				{}	{}	rn6KTN9GNaa7
9	f	test3@test.com	f	f	pbkdf2_sha256$216000$gjsrrmNtGJJz$SftH0llmx36y4cxl7gy4JIEG0fxKMB1DVpov4vCrseg=	2021-06-24 19:21:16.353454+00	\N	\N	\N	\N				{}	{}	s8MK5067fWJT
\.


--
-- Data for Name: account_user_addresses; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.account_user_addresses (id, user_id, address_id) FROM stdin;
1	1	2
2	5	12
3	5	65
\.


--
-- Data for Name: account_user_groups; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.account_user_groups (id, user_id, group_id) FROM stdin;
1	1	1
2	2	2
3	3	2
\.


--
-- Data for Name: account_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.account_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: app_app; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.app_app (id, private_metadata, metadata, name, created, is_active, about_app, app_url, configuration_url, data_privacy, data_privacy_url, homepage_url, identifier, support_url, type, version) FROM stdin;
\.


--
-- Data for Name: app_app_permissions; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.app_app_permissions (id, app_id, permission_id) FROM stdin;
\.


--
-- Data for Name: app_appinstallation; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.app_appinstallation (id, status, message, created_at, updated_at, app_name, manifest_url) FROM stdin;
\.


--
-- Data for Name: app_appinstallation_permissions; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.app_appinstallation_permissions (id, appinstallation_id, permission_id) FROM stdin;
\.


--
-- Data for Name: app_apptoken; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.app_apptoken (id, name, auth_token, app_id) FROM stdin;
\.


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.auth_group (id, name) FROM stdin;
1	Full Access
2	Customer Support
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
1	1	194
2	1	164
3	1	69
4	1	5
5	1	295
6	1	236
7	1	31
8	1	237
9	1	82
10	1	181
11	1	87
12	1	250
13	1	60
14	1	30
15	1	223
16	2	194
17	2	164
18	2	69
19	2	30
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add plugin configuration	1	add_pluginconfiguration
2	Can change plugin configuration	1	change_pluginconfiguration
3	Can delete plugin configuration	1	delete_pluginconfiguration
4	Can view plugin configuration	1	view_pluginconfiguration
5	Manage plugins	1	manage_plugins
6	Can add content type	2	add_contenttype
7	Can change content type	2	change_contenttype
8	Can delete content type	2	delete_contenttype
9	Can view content type	2	view_contenttype
10	Can add site	3	add_site
11	Can change site	3	change_site
12	Can delete site	3	delete_site
13	Can view site	3	view_site
14	Can add permission	4	add_permission
15	Can change permission	4	change_permission
16	Can delete permission	4	delete_permission
17	Can view permission	4	view_permission
18	Can add group	5	add_group
19	Can change group	5	change_group
20	Can delete group	5	delete_group
21	Can view group	5	view_group
22	Can add address	6	add_address
23	Can change address	6	change_address
24	Can delete address	6	delete_address
25	Can view address	6	view_address
26	Can add user	7	add_user
27	Can change user	7	change_user
28	Can delete user	7	delete_user
29	Can view user	7	view_user
30	Manage customers.	7	manage_users
31	Manage staff.	7	manage_staff
32	Can add customer note	8	add_customernote
33	Can change customer note	8	change_customernote
34	Can delete customer note	8	delete_customernote
35	Can view customer note	8	view_customernote
36	Can add customer event	9	add_customerevent
37	Can change customer event	9	change_customerevent
38	Can delete customer event	9	delete_customerevent
39	Can view customer event	9	view_customerevent
40	Can add staff notification recipient	10	add_staffnotificationrecipient
41	Can change staff notification recipient	10	change_staffnotificationrecipient
42	Can delete staff notification recipient	10	delete_staffnotificationrecipient
43	Can view staff notification recipient	10	view_staffnotificationrecipient
44	Can add voucher	11	add_voucher
45	Can change voucher	11	change_voucher
46	Can delete voucher	11	delete_voucher
47	Can view voucher	11	view_voucher
48	Can add voucher customer	12	add_vouchercustomer
49	Can change voucher customer	12	change_vouchercustomer
50	Can delete voucher customer	12	delete_vouchercustomer
51	Can view voucher customer	12	view_vouchercustomer
52	Can add voucher translation	13	add_vouchertranslation
53	Can change voucher translation	13	change_vouchertranslation
54	Can delete voucher translation	13	delete_vouchertranslation
55	Can view voucher translation	13	view_vouchertranslation
56	Can add sale	14	add_sale
57	Can change sale	14	change_sale
58	Can delete sale	14	delete_sale
59	Can view sale	14	view_sale
60	Manage sales and vouchers.	14	manage_discounts
61	Can add sale translation	15	add_saletranslation
62	Can change sale translation	15	change_saletranslation
63	Can delete sale translation	15	delete_saletranslation
64	Can view sale translation	15	view_saletranslation
65	Can add gift card	16	add_giftcard
66	Can change gift card	16	change_giftcard
67	Can delete gift card	16	delete_giftcard
68	Can view gift card	16	view_giftcard
69	Manage gift cards.	16	manage_gift_card
70	Can add category	17	add_category
71	Can change category	17	change_category
72	Can delete category	17	delete_category
73	Can view category	17	view_category
74	Can add category translation	18	add_categorytranslation
75	Can change category translation	18	change_categorytranslation
76	Can delete category translation	18	delete_categorytranslation
77	Can view category translation	18	view_categorytranslation
78	Can add product type	19	add_producttype
79	Can change product type	19	change_producttype
80	Can delete product type	19	delete_producttype
81	Can view product type	19	view_producttype
82	Manage product types and attributes.	19	manage_product_types_and_attributes
83	Can add product	20	add_product
84	Can change product	20	change_product
85	Can delete product	20	delete_product
86	Can view product	20	view_product
87	Manage products.	20	manage_products
88	Can add product translation	21	add_producttranslation
89	Can change product translation	21	change_producttranslation
90	Can delete product translation	21	delete_producttranslation
91	Can view product translation	21	view_producttranslation
92	Can add product variant	22	add_productvariant
93	Can change product variant	22	change_productvariant
94	Can delete product variant	22	delete_productvariant
95	Can view product variant	22	view_productvariant
96	Can add product variant translation	23	add_productvarianttranslation
97	Can change product variant translation	23	change_productvarianttranslation
98	Can delete product variant translation	23	delete_productvarianttranslation
99	Can view product variant translation	23	view_productvarianttranslation
100	Can add digital content	24	add_digitalcontent
101	Can change digital content	24	change_digitalcontent
102	Can delete digital content	24	delete_digitalcontent
103	Can view digital content	24	view_digitalcontent
104	Can add digital content url	25	add_digitalcontenturl
105	Can change digital content url	25	change_digitalcontenturl
106	Can delete digital content url	25	delete_digitalcontenturl
107	Can view digital content url	25	view_digitalcontenturl
108	Can add assigned product attribute	26	add_assignedproductattribute
109	Can change assigned product attribute	26	change_assignedproductattribute
110	Can delete assigned product attribute	26	delete_assignedproductattribute
111	Can view assigned product attribute	26	view_assignedproductattribute
112	Can add assigned variant attribute	27	add_assignedvariantattribute
113	Can change assigned variant attribute	27	change_assignedvariantattribute
114	Can delete assigned variant attribute	27	delete_assignedvariantattribute
115	Can view assigned variant attribute	27	view_assignedvariantattribute
116	Can add attribute product	28	add_attributeproduct
117	Can change attribute product	28	change_attributeproduct
118	Can delete attribute product	28	delete_attributeproduct
119	Can view attribute product	28	view_attributeproduct
120	Can add attribute variant	29	add_attributevariant
121	Can change attribute variant	29	change_attributevariant
122	Can delete attribute variant	29	delete_attributevariant
123	Can view attribute variant	29	view_attributevariant
124	Can add attribute	30	add_attribute
125	Can change attribute	30	change_attribute
126	Can delete attribute	30	delete_attribute
127	Can view attribute	30	view_attribute
128	Can add attribute translation	31	add_attributetranslation
129	Can change attribute translation	31	change_attributetranslation
130	Can delete attribute translation	31	delete_attributetranslation
131	Can view attribute translation	31	view_attributetranslation
132	Can add attribute value	32	add_attributevalue
133	Can change attribute value	32	change_attributevalue
134	Can delete attribute value	32	delete_attributevalue
135	Can view attribute value	32	view_attributevalue
136	Can add attribute value translation	33	add_attributevaluetranslation
137	Can change attribute value translation	33	change_attributevaluetranslation
138	Can delete attribute value translation	33	delete_attributevaluetranslation
139	Can view attribute value translation	33	view_attributevaluetranslation
140	Can add product image	34	add_productimage
141	Can change product image	34	change_productimage
142	Can delete product image	34	delete_productimage
143	Can view product image	34	view_productimage
144	Can add variant image	35	add_variantimage
145	Can change variant image	35	change_variantimage
146	Can delete variant image	35	delete_variantimage
147	Can view variant image	35	view_variantimage
148	Can add collection product	36	add_collectionproduct
149	Can change collection product	36	change_collectionproduct
150	Can delete collection product	36	delete_collectionproduct
151	Can view collection product	36	view_collectionproduct
152	Can add collection	37	add_collection
153	Can change collection	37	change_collection
154	Can delete collection	37	delete_collection
155	Can view collection	37	view_collection
156	Can add collection translation	38	add_collectiontranslation
157	Can change collection translation	38	change_collectiontranslation
158	Can delete collection translation	38	delete_collectiontranslation
159	Can view collection translation	38	view_collectiontranslation
160	Can add checkout	39	add_checkout
161	Can change checkout	39	change_checkout
162	Can delete checkout	39	delete_checkout
163	Can view checkout	39	view_checkout
164	Manage checkouts	39	manage_checkouts
165	Can add checkout line	40	add_checkoutline
166	Can change checkout line	40	change_checkoutline
167	Can delete checkout line	40	delete_checkoutline
168	Can view checkout line	40	view_checkoutline
169	Can add export file	41	add_exportfile
170	Can change export file	41	change_exportfile
171	Can delete export file	41	delete_exportfile
172	Can view export file	41	view_exportfile
173	Can add export event	42	add_exportevent
174	Can change export event	42	change_exportevent
175	Can delete export event	42	delete_exportevent
176	Can view export event	42	view_exportevent
177	Can add menu	43	add_menu
178	Can change menu	43	change_menu
179	Can delete menu	43	delete_menu
180	Can view menu	43	view_menu
181	Manage navigation.	43	manage_menus
182	Can add menu item	44	add_menuitem
183	Can change menu item	44	change_menuitem
184	Can delete menu item	44	delete_menuitem
185	Can view menu item	44	view_menuitem
186	Can add menu item translation	45	add_menuitemtranslation
187	Can change menu item translation	45	change_menuitemtranslation
188	Can delete menu item translation	45	delete_menuitemtranslation
189	Can view menu item translation	45	view_menuitemtranslation
190	Can add order	46	add_order
191	Can change order	46	change_order
192	Can delete order	46	delete_order
193	Can view order	46	view_order
194	Manage orders.	46	manage_orders
195	Can add order line	47	add_orderline
196	Can change order line	47	change_orderline
197	Can delete order line	47	delete_orderline
198	Can view order line	47	view_orderline
199	Can add fulfillment	48	add_fulfillment
200	Can change fulfillment	48	change_fulfillment
201	Can delete fulfillment	48	delete_fulfillment
202	Can view fulfillment	48	view_fulfillment
203	Can add fulfillment line	49	add_fulfillmentline
204	Can change fulfillment line	49	change_fulfillmentline
205	Can delete fulfillment line	49	delete_fulfillmentline
206	Can view fulfillment line	49	view_fulfillmentline
207	Can add order event	50	add_orderevent
208	Can change order event	50	change_orderevent
209	Can delete order event	50	delete_orderevent
210	Can view order event	50	view_orderevent
211	Can add invoice	51	add_invoice
212	Can change invoice	51	change_invoice
213	Can delete invoice	51	delete_invoice
214	Can view invoice	51	view_invoice
215	Can add invoice event	52	add_invoiceevent
216	Can change invoice event	52	change_invoiceevent
217	Can delete invoice event	52	delete_invoiceevent
218	Can view invoice event	52	view_invoiceevent
219	Can add shipping zone	53	add_shippingzone
220	Can change shipping zone	53	change_shippingzone
221	Can delete shipping zone	53	delete_shippingzone
222	Can view shipping zone	53	view_shippingzone
223	Manage shipping.	53	manage_shipping
224	Can add shipping method	54	add_shippingmethod
225	Can change shipping method	54	change_shippingmethod
226	Can delete shipping method	54	delete_shippingmethod
227	Can view shipping method	54	view_shippingmethod
228	Can add shipping method translation	55	add_shippingmethodtranslation
229	Can change shipping method translation	55	change_shippingmethodtranslation
230	Can delete shipping method translation	55	delete_shippingmethodtranslation
231	Can view shipping method translation	55	view_shippingmethodtranslation
232	Can add site settings	56	add_sitesettings
233	Can change site settings	56	change_sitesettings
234	Can delete site settings	56	delete_sitesettings
235	Can view site settings	56	view_sitesettings
236	Manage settings.	56	manage_settings
237	Manage translations.	56	manage_translations
238	Can add site settings translation	57	add_sitesettingstranslation
239	Can change site settings translation	57	change_sitesettingstranslation
240	Can delete site settings translation	57	delete_sitesettingstranslation
241	Can view site settings translation	57	view_sitesettingstranslation
242	Can add authorization key	58	add_authorizationkey
243	Can change authorization key	58	change_authorizationkey
244	Can delete authorization key	58	delete_authorizationkey
245	Can view authorization key	58	view_authorizationkey
246	Can add page	59	add_page
247	Can change page	59	change_page
248	Can delete page	59	delete_page
249	Can view page	59	view_page
250	Manage pages.	59	manage_pages
251	Can add page translation	60	add_pagetranslation
252	Can change page translation	60	change_pagetranslation
253	Can delete page translation	60	delete_pagetranslation
254	Can view page translation	60	view_pagetranslation
255	Can add payment	61	add_payment
256	Can change payment	61	change_payment
257	Can delete payment	61	delete_payment
258	Can view payment	61	view_payment
259	Can add transaction	62	add_transaction
260	Can change transaction	62	change_transaction
261	Can delete transaction	62	delete_transaction
262	Can view transaction	62	view_transaction
263	Can add warehouse	63	add_warehouse
264	Can change warehouse	63	change_warehouse
265	Can delete warehouse	63	delete_warehouse
266	Can view warehouse	63	view_warehouse
267	Can add stock	64	add_stock
268	Can change stock	64	change_stock
269	Can delete stock	64	delete_stock
270	Can view stock	64	view_stock
271	Can add allocation	65	add_allocation
272	Can change allocation	65	change_allocation
273	Can delete allocation	65	delete_allocation
274	Can view allocation	65	view_allocation
275	Can add webhook	66	add_webhook
276	Can change webhook	66	change_webhook
277	Can delete webhook	66	delete_webhook
278	Can view webhook	66	view_webhook
279	Can add webhook event	67	add_webhookevent
280	Can change webhook event	67	change_webhookevent
281	Can delete webhook event	67	delete_webhookevent
282	Can view webhook event	67	view_webhookevent
283	Can add wishlist	68	add_wishlist
284	Can change wishlist	68	change_wishlist
285	Can delete wishlist	68	delete_wishlist
286	Can view wishlist	68	view_wishlist
287	Can add wishlist item	69	add_wishlistitem
288	Can change wishlist item	69	change_wishlistitem
289	Can delete wishlist item	69	delete_wishlistitem
290	Can view wishlist item	69	view_wishlistitem
291	Can add app	70	add_app
292	Can change app	70	change_app
293	Can delete app	70	delete_app
294	Can view app	70	view_app
295	Manage apps	70	manage_apps
296	Can add app token	71	add_apptoken
297	Can change app token	71	change_apptoken
298	Can delete app token	71	delete_apptoken
299	Can view app token	71	view_apptoken
300	Can add app installation	72	add_appinstallation
301	Can change app installation	72	change_appinstallation
302	Can delete app installation	72	delete_appinstallation
303	Can view app installation	72	view_appinstallation
304	Can add rfq	73	add_rfq
305	Can change rfq	73	change_rfq
306	Can delete rfq	73	delete_rfq
307	Can view rfq	73	view_rfq
308	Can add rfq item	74	add_rfqitem
309	Can change rfq item	74	change_rfqitem
310	Can delete rfq item	74	delete_rfqitem
311	Can view rfq item	74	view_rfqitem
312	Can add conversion rate	75	add_conversionrate
313	Can change conversion rate	75	change_conversionrate
314	Can delete conversion rate	75	delete_conversionrate
315	Can view conversion rate	75	view_conversionrate
316	Can add vat	76	add_vat
317	Can change vat	76	change_vat
318	Can delete vat	76	delete_vat
319	Can view vat	76	view_vat
320	Can add rate types	77	add_ratetypes
321	Can change rate types	77	change_ratetypes
322	Can delete rate types	77	delete_ratetypes
323	Can view rate types	77	view_ratetypes
324	Can add API key	78	add_apikey
325	Can change API key	78	change_apikey
326	Can delete API key	78	delete_apikey
327	Can view API key	78	view_apikey
\.


--
-- Data for Name: checkout_checkout; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.checkout_checkout (created, last_change, email, token, quantity, user_id, billing_address_id, discount_amount, discount_name, note, shipping_address_id, shipping_method_id, voucher_code, translated_discount_name, metadata, private_metadata, currency, country, redirect_url, tracking_code) FROM stdin;
\.


--
-- Data for Name: checkout_checkout_gift_cards; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.checkout_checkout_gift_cards (id, checkout_id, giftcard_id) FROM stdin;
\.


--
-- Data for Name: checkout_checkoutline; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.checkout_checkoutline (id, quantity, checkout_id, variant_id, data) FROM stdin;
\.


--
-- Data for Name: csv_exportevent; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.csv_exportevent (id, date, type, parameters, app_id, export_file_id, user_id) FROM stdin;
\.


--
-- Data for Name: csv_exportfile; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.csv_exportfile (id, status, created_at, updated_at, content_file, app_id, user_id, message) FROM stdin;
\.


--
-- Data for Name: discount_sale; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.discount_sale (id, name, type, value, end_date, start_date) FROM stdin;
\.


--
-- Data for Name: discount_sale_categories; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.discount_sale_categories (id, sale_id, category_id) FROM stdin;
\.


--
-- Data for Name: discount_sale_collections; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.discount_sale_collections (id, sale_id, collection_id) FROM stdin;
\.


--
-- Data for Name: discount_sale_products; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.discount_sale_products (id, sale_id, product_id) FROM stdin;
\.


--
-- Data for Name: discount_saletranslation; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.discount_saletranslation (id, language_code, name, sale_id) FROM stdin;
\.


--
-- Data for Name: discount_voucher; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.discount_voucher (id, type, name, code, usage_limit, used, start_date, end_date, discount_value_type, discount_value, min_spent_amount, apply_once_per_order, countries, min_checkout_items_quantity, apply_once_per_customer, currency) FROM stdin;
\.


--
-- Data for Name: discount_voucher_categories; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.discount_voucher_categories (id, voucher_id, category_id) FROM stdin;
\.


--
-- Data for Name: discount_voucher_collections; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.discount_voucher_collections (id, voucher_id, collection_id) FROM stdin;
\.


--
-- Data for Name: discount_voucher_products; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.discount_voucher_products (id, voucher_id, product_id) FROM stdin;
\.


--
-- Data for Name: discount_vouchercustomer; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.discount_vouchercustomer (id, customer_email, voucher_id) FROM stdin;
\.


--
-- Data for Name: discount_vouchertranslation; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.discount_vouchertranslation (id, language_code, name, voucher_id) FROM stdin;
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	plugins	pluginconfiguration
2	contenttypes	contenttype
3	sites	site
4	auth	permission
5	auth	group
6	account	address
7	account	user
8	account	customernote
9	account	customerevent
10	account	staffnotificationrecipient
11	discount	voucher
12	discount	vouchercustomer
13	discount	vouchertranslation
14	discount	sale
15	discount	saletranslation
16	giftcard	giftcard
17	product	category
18	product	categorytranslation
19	product	producttype
20	product	product
21	product	producttranslation
22	product	productvariant
23	product	productvarianttranslation
24	product	digitalcontent
25	product	digitalcontenturl
26	product	assignedproductattribute
27	product	assignedvariantattribute
28	product	attributeproduct
29	product	attributevariant
30	product	attribute
31	product	attributetranslation
32	product	attributevalue
33	product	attributevaluetranslation
34	product	productimage
35	product	variantimage
36	product	collectionproduct
37	product	collection
38	product	collectiontranslation
39	checkout	checkout
40	checkout	checkoutline
41	csv	exportfile
42	csv	exportevent
43	menu	menu
44	menu	menuitem
45	menu	menuitemtranslation
46	order	order
47	order	orderline
48	order	fulfillment
49	order	fulfillmentline
50	order	orderevent
51	invoice	invoice
52	invoice	invoiceevent
53	shipping	shippingzone
54	shipping	shippingmethod
55	shipping	shippingmethodtranslation
56	site	sitesettings
57	site	sitesettingstranslation
58	site	authorizationkey
59	page	page
60	page	pagetranslation
61	payment	payment
62	payment	transaction
63	warehouse	warehouse
64	warehouse	stock
65	warehouse	allocation
66	webhook	webhook
67	webhook	webhookevent
68	wishlist	wishlist
69	wishlist	wishlistitem
70	app	app
71	app	apptoken
72	app	appinstallation
73	rfq	rfq
74	rfq	rfqitem
75	django_prices_openexchangerates	conversionrate
76	django_prices_vatlayer	vat
77	django_prices_vatlayer	ratetypes
78	rest_framework_api_key	apikey
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	plugins	0001_initial	2021-05-19 15:48:17.157601+00
2	plugins	0002_auto_20200417_0335	2021-05-19 15:48:17.178808+00
3	contenttypes	0001_initial	2021-05-19 15:48:17.187132+00
4	contenttypes	0002_remove_content_type_name	2021-05-19 15:48:17.194232+00
5	auth	0001_initial	2021-05-19 15:48:17.2128+00
6	auth	0002_alter_permission_name_max_length	2021-05-19 15:48:17.230581+00
7	auth	0003_alter_user_email_max_length	2021-05-19 15:48:17.236797+00
8	auth	0004_alter_user_username_opts	2021-05-19 15:48:17.243163+00
9	auth	0005_alter_user_last_login_null	2021-05-19 15:48:17.249005+00
10	auth	0006_require_contenttypes_0002	2021-05-19 15:48:17.251086+00
11	auth	0007_alter_validators_add_error_messages	2021-05-19 15:48:17.257815+00
12	auth	0008_alter_user_username_max_length	2021-05-19 15:48:17.263911+00
13	auth	0009_alter_user_last_name_max_length	2021-05-19 15:48:17.269872+00
14	auth	0010_alter_group_name_max_length	2021-05-19 15:48:17.27574+00
15	auth	0011_update_proxy_permissions	2021-05-19 15:48:17.282822+00
16	product	0001_initial	2021-05-19 15:48:17.469843+00
17	product	0002_auto_20150722_0545	2021-05-19 15:48:17.518605+00
18	product	0003_auto_20150820_2016	2021-05-19 15:48:17.536232+00
19	product	0003_auto_20150820_1955	2021-05-19 15:48:17.545817+00
20	product	0004_merge	2021-05-19 15:48:17.547763+00
21	product	0005_auto_20150825_1433	2021-05-19 15:48:17.589606+00
22	product	0006_product_updated_at	2021-05-19 15:48:17.599298+00
23	product	0007_auto_20160112_1025	2021-05-19 15:48:17.62681+00
24	product	0008_auto_20160114_0733	2021-05-19 15:48:17.651015+00
25	product	0009_discount_categories	2021-05-19 15:48:17.663915+00
26	product	0010_auto_20160129_0826	2021-05-19 15:48:17.691353+00
27	product	0011_stock_quantity_allocated	2021-05-19 15:48:17.700514+00
28	product	0012_auto_20160218_0812	2021-05-19 15:48:17.719816+00
29	product	0013_auto_20161207_0555	2021-05-19 15:48:17.738141+00
30	product	0014_auto_20161207_0840	2021-05-19 15:48:17.749508+00
31	product	0015_transfer_locations	2021-05-19 15:48:17.763993+00
32	product	0016_auto_20161207_0843	2021-05-19 15:48:17.777591+00
33	product	0017_remove_stock_location	2021-05-19 15:48:17.786928+00
34	product	0018_auto_20161207_0844	2021-05-19 15:48:17.805454+00
35	product	0019_auto_20161212_0230	2021-05-19 15:48:17.835463+00
36	product	0020_attribute_data_to_class	2021-05-19 15:48:17.864006+00
37	product	0021_add_hstore_extension	2021-05-19 15:48:17.882167+00
38	product	0022_auto_20161212_0301	2021-05-19 15:48:17.919373+00
39	product	0023_auto_20161211_1912	2021-05-19 15:48:17.930342+00
40	product	0024_migrate_json_data	2021-05-19 15:48:17.960006+00
41	product	0025_auto_20161219_0517	2021-05-19 15:48:17.966554+00
42	product	0026_auto_20161230_0347	2021-05-19 15:48:17.977393+00
43	product	0027_auto_20170113_0435	2021-05-19 15:48:18.024874+00
44	product	0013_auto_20161130_0608	2021-05-19 15:48:18.028172+00
45	product	0014_remove_productvariant_attributes	2021-05-19 15:48:18.038005+00
46	product	0015_productvariant_attributes	2021-05-19 15:48:18.051377+00
47	product	0016_auto_20161204_0311	2021-05-19 15:48:18.060763+00
48	product	0017_attributechoicevalue_slug	2021-05-19 15:48:18.067639+00
49	product	0018_auto_20161212_0725	2021-05-19 15:48:18.085675+00
50	product	0026_merge_20161221_0845	2021-05-19 15:48:18.087454+00
51	product	0028_merge_20170116_1016	2021-05-19 15:48:18.089252+00
52	product	0029_product_is_featured	2021-05-19 15:48:18.098317+00
53	product	0030_auto_20170206_0407	2021-05-19 15:48:18.229831+00
54	product	0031_auto_20170206_0601	2021-05-19 15:48:18.248963+00
55	product	0032_auto_20170216_0438	2021-05-19 15:48:18.258307+00
56	product	0033_auto_20170227_0757	2021-05-19 15:48:18.291195+00
57	product	0034_product_is_published	2021-05-19 15:48:18.301608+00
58	product	0035_auto_20170919_0846	2021-05-19 15:48:18.316295+00
59	product	0036_auto_20171115_0608	2021-05-19 15:48:18.326617+00
60	product	0037_auto_20171124_0847	2021-05-19 15:48:18.337938+00
61	product	0038_auto_20171129_0616	2021-05-19 15:48:18.363121+00
62	product	0037_auto_20171129_1004	2021-05-19 15:48:18.407611+00
63	product	0039_merge_20171130_0727	2021-05-19 15:48:18.409927+00
64	product	0040_auto_20171205_0428	2021-05-19 15:48:18.42122+00
65	product	0041_auto_20171205_0546	2021-05-19 15:48:18.432093+00
66	product	0042_auto_20171206_0501	2021-05-19 15:48:18.443521+00
67	product	0043_auto_20171207_0839	2021-05-19 15:48:18.454189+00
68	product	0044_auto_20180108_0814	2021-05-19 15:48:18.800157+00
69	product	0045_md_to_html	2021-05-19 15:48:18.816616+00
70	product	0046_product_category	2021-05-19 15:48:18.842729+00
71	product	0047_auto_20180117_0359	2021-05-19 15:48:18.87354+00
72	product	0048_product_class_to_type	2021-05-19 15:48:18.956261+00
73	product	0049_collection	2021-05-19 15:48:18.996446+00
74	product	0050_auto_20180131_0746	2021-05-19 15:48:19.012642+00
75	product	0051_auto_20180202_1106	2021-05-19 15:48:19.021635+00
76	product	0052_slug_field_length	2021-05-19 15:48:19.047329+00
77	product	0053_product_seo_description	2021-05-19 15:48:19.058846+00
78	product	0053_auto_20180305_1002	2021-05-19 15:48:19.073399+00
79	product	0054_merge_20180320_1108	2021-05-19 15:48:19.076015+00
80	shipping	0001_initial	2021-05-19 15:48:19.09183+00
81	shipping	0002_auto_20160906_0741	2021-05-19 15:48:19.102666+00
82	shipping	0003_auto_20170116_0700	2021-05-19 15:48:19.107521+00
83	shipping	0004_auto_20170206_0407	2021-05-19 15:48:19.126702+00
84	shipping	0005_auto_20170906_0556	2021-05-19 15:48:19.131796+00
85	shipping	0006_auto_20171109_0908	2021-05-19 15:48:19.136092+00
86	shipping	0007_auto_20171129_1004	2021-05-19 15:48:19.142742+00
87	shipping	0008_auto_20180108_0814	2021-05-19 15:48:19.292364+00
88	userprofile	0001_initial	2021-05-19 15:48:19.342067+00
89	order	0001_initial	2021-05-19 15:48:19.452015+00
90	order	0002_auto_20150820_1955	2021-05-19 15:48:19.483677+00
91	order	0003_auto_20150825_1433	2021-05-19 15:48:19.503342+00
92	order	0004_order_total	2021-05-19 15:48:19.517258+00
93	order	0005_deliverygroup_last_updated	2021-05-19 15:48:19.530804+00
94	order	0006_deliverygroup_shipping_method	2021-05-19 15:48:19.544656+00
95	order	0007_deliverygroup_tracking_number	2021-05-19 15:48:19.561208+00
96	order	0008_auto_20151026_0820	2021-05-19 15:48:19.601803+00
97	order	0009_auto_20151201_0820	2021-05-19 15:48:19.646018+00
98	order	0010_auto_20160119_0541	2021-05-19 15:48:19.689521+00
99	discount	0001_initial	2021-05-19 15:48:19.721281+00
100	discount	0002_voucher	2021-05-19 15:48:19.761497+00
101	discount	0003_auto_20160207_0534	2021-05-19 15:48:19.859895+00
102	order	0011_auto_20160207_0534	2021-05-19 15:48:19.909889+00
103	order	0012_auto_20160216_1032	2021-05-19 15:48:19.950258+00
104	order	0013_auto_20160906_0741	2021-05-19 15:48:20.014101+00
105	order	0014_auto_20161028_0955	2021-05-19 15:48:20.030659+00
106	order	0015_auto_20170206_0407	2021-05-19 15:48:20.575044+00
107	order	0016_order_language_code	2021-05-19 15:48:20.592114+00
108	order	0017_auto_20170906_0556	2021-05-19 15:48:20.60585+00
109	order	0018_auto_20170919_0839	2021-05-19 15:48:20.624065+00
110	order	0019_auto_20171109_1423	2021-05-19 15:48:20.758118+00
111	order	0020_auto_20171123_0609	2021-05-19 15:48:20.799292+00
112	order	0021_auto_20171129_1004	2021-05-19 15:48:20.866281+00
113	order	0022_auto_20171205_0428	2021-05-19 15:48:20.895943+00
114	order	0023_auto_20171206_0506	2021-05-19 15:48:20.935474+00
115	order	0024_remove_order_status	2021-05-19 15:48:20.953088+00
116	order	0025_auto_20171214_1015	2021-05-19 15:48:20.977517+00
117	order	0026_auto_20171218_0428	2021-05-19 15:48:21.16556+00
118	order	0027_auto_20180108_0814	2021-05-19 15:48:21.705333+00
119	order	0028_status_fsm	2021-05-19 15:48:21.718645+00
120	order	0029_auto_20180111_0845	2021-05-19 15:48:21.760041+00
121	order	0030_auto_20180118_0605	2021-05-19 15:48:21.800505+00
122	order	0031_auto_20180119_0405	2021-05-19 15:48:21.995458+00
123	order	0032_orderline_is_shipping_required	2021-05-19 15:48:22.036599+00
124	order	0033_auto_20180123_0832	2021-05-19 15:48:22.053423+00
125	order	0034_auto_20180221_1056	2021-05-19 15:48:22.09939+00
126	order	0035_auto_20180221_1057	2021-05-19 15:48:22.127008+00
127	order	0036_remove_order_total_tax	2021-05-19 15:48:22.143515+00
128	order	0037_auto_20180228_0450	2021-05-19 15:48:22.197034+00
129	order	0038_auto_20180228_0451	2021-05-19 15:48:22.225076+00
130	order	0039_auto_20180312_1203	2021-05-19 15:48:22.258681+00
131	order	0040_auto_20180210_0422	2021-05-19 15:48:22.441699+00
132	order	0041_auto_20180222_0458	2021-05-19 15:48:22.47685+00
133	order	0042_auto_20180227_0436	2021-05-19 15:48:22.579203+00
134	order	0043_auto_20180322_0655	2021-05-19 15:48:22.610504+00
135	order	0044_auto_20180326_1055	2021-05-19 15:48:22.740064+00
136	order	0045_auto_20180329_0142	2021-05-19 15:48:23.000083+00
137	order	0046_order_line_taxes	2021-05-19 15:48:23.034997+00
138	order	0047_order_line_name_length	2021-05-19 15:48:23.053796+00
139	order	0048_auto_20180629_1055	2021-05-19 15:48:23.100867+00
140	order	0049_auto_20180719_0520	2021-05-19 15:48:23.117249+00
141	order	0050_auto_20180803_0528	2021-05-19 15:48:23.152972+00
142	order	0050_auto_20180803_0337	2021-05-19 15:48:23.185727+00
143	order	0051_merge_20180807_0704	2021-05-19 15:48:23.187726+00
144	order	0052_auto_20180822_0720	2021-05-19 15:48:23.236354+00
145	order	0053_orderevent	2021-05-19 15:48:23.267737+00
146	order	0054_move_data_to_order_events	2021-05-19 15:48:23.32579+00
147	order	0055_remove_order_note_order_history_entry	2021-05-19 15:48:23.444774+00
148	order	0056_auto_20180911_1541	2021-05-19 15:48:23.460819+00
149	order	0057_orderevent_parameters_new	2021-05-19 15:48:23.502843+00
150	order	0058_remove_orderevent_parameters	2021-05-19 15:48:23.517075+00
151	order	0059_auto_20180913_0841	2021-05-19 15:48:23.533301+00
152	order	0060_auto_20180919_0731	2021-05-19 15:48:23.686066+00
153	order	0061_auto_20180920_0859	2021-05-19 15:48:23.705242+00
154	order	0062_auto_20180921_0949	2021-05-19 15:48:23.74218+00
155	order	0063_auto_20180926_0446	2021-05-19 15:48:23.756853+00
156	order	0064_auto_20181016_0819	2021-05-19 15:48:23.789351+00
157	cart	0001_initial	2021-05-19 15:48:23.860451+00
158	cart	0002_auto_20161014_1221	2021-05-19 15:48:23.894438+00
159	cart	fix_empty_data_in_lines	2021-05-19 15:48:23.926663+00
160	cart	0001_auto_20170113_0435	2021-05-19 15:48:23.961268+00
161	cart	0002_auto_20170206_0407	2021-05-19 15:48:24.099138+00
162	cart	0003_auto_20170906_0556	2021-05-19 15:48:24.114654+00
163	cart	0004_auto_20171129_1004	2021-05-19 15:48:24.140772+00
164	cart	0005_auto_20180108_0814	2021-05-19 15:48:24.522399+00
165	cart	0006_auto_20180221_0825	2021-05-19 15:48:24.538383+00
166	userprofile	0002_auto_20150907_0602	2021-05-19 15:48:24.574534+00
167	userprofile	0003_auto_20151104_1102	2021-05-19 15:48:24.610716+00
168	userprofile	0004_auto_20160114_0419	2021-05-19 15:48:24.640457+00
169	userprofile	0005_auto_20160205_0651	2021-05-19 15:48:24.699059+00
170	userprofile	0006_auto_20160829_0819	2021-05-19 15:48:24.72917+00
171	userprofile	0007_auto_20161115_0940	2021-05-19 15:48:24.788648+00
172	userprofile	0008_auto_20161115_1011	2021-05-19 15:48:24.805071+00
173	userprofile	0009_auto_20170206_0407	2021-05-19 15:48:24.884184+00
174	userprofile	0010_auto_20170919_0839	2021-05-19 15:48:24.900488+00
175	userprofile	0011_auto_20171110_0552	2021-05-19 15:48:24.916766+00
176	userprofile	0012_auto_20171117_0846	2021-05-19 15:48:24.932034+00
177	userprofile	0013_auto_20171120_0521	2021-05-19 15:48:24.992384+00
178	userprofile	0014_auto_20171129_1004	2021-05-19 15:48:25.017157+00
179	userprofile	0015_auto_20171213_0734	2021-05-19 15:48:25.049321+00
180	userprofile	0016_auto_20180108_0814	2021-05-19 15:48:25.635815+00
181	account	0017_auto_20180206_0957	2021-05-19 15:48:25.666155+00
182	account	0018_auto_20180426_0641	2021-05-19 15:48:25.747164+00
183	account	0019_auto_20180528_1205	2021-05-19 15:48:25.791947+00
184	checkout	0007_merge_cart_with_checkout	2021-05-19 15:48:26.230326+00
185	checkout	0008_rename_tables	2021-05-19 15:48:26.268874+00
186	checkout	0009_cart_translated_discount_name	2021-05-19 15:48:26.2875+00
187	checkout	0010_auto_20180822_0720	2021-05-19 15:48:26.323831+00
188	checkout	0011_auto_20180913_0817	2021-05-19 15:48:26.390676+00
189	checkout	0012_remove_cartline_data	2021-05-19 15:48:26.410501+00
190	checkout	0013_auto_20180913_0841	2021-05-19 15:48:26.441895+00
191	checkout	0014_auto_20180921_0751	2021-05-19 15:48:26.459362+00
192	checkout	0015_auto_20181017_1346	2021-05-19 15:48:26.479094+00
193	payment	0001_initial	2021-05-19 15:48:26.551727+00
194	payment	0002_transfer_payment_to_payment_method	2021-05-19 15:48:26.591696+00
195	order	0065_auto_20181017_1346	2021-05-19 15:48:26.728335+00
196	order	0066_auto_20181023_0319	2021-05-19 15:48:26.763767+00
197	order	0067_auto_20181102_1054	2021-05-19 15:48:26.785322+00
198	order	0068_order_checkout_token	2021-05-19 15:48:26.809829+00
199	order	0069_auto_20190225_2305	2021-05-19 15:48:26.821976+00
200	order	0070_drop_update_event_and_rename_events	2021-05-19 15:48:26.913522+00
201	account	0020_user_token	2021-05-19 15:48:26.932083+00
202	account	0021_unique_token	2021-05-19 15:48:26.981985+00
203	account	0022_auto_20180718_0956	2021-05-19 15:48:26.998034+00
204	account	0023_auto_20180719_0520	2021-05-19 15:48:27.016183+00
205	account	0024_auto_20181011_0737	2021-05-19 15:48:27.047821+00
206	account	0025_auto_20190314_0550	2021-05-19 15:48:27.060763+00
207	account	0026_user_avatar	2021-05-19 15:48:27.080564+00
208	account	0027_customerevent	2021-05-19 15:48:27.260641+00
209	account	0028_user_private_meta	2021-05-19 15:48:27.284866+00
210	account	0029_user_meta	2021-05-19 15:48:27.303247+00
211	account	0030_auto_20190719_0733	2021-05-19 15:48:27.321191+00
212	account	0031_auto_20190719_0745	2021-05-19 15:48:27.344002+00
213	account	0032_remove_user_token	2021-05-19 15:48:27.364823+00
214	account	0033_serviceaccount	2021-05-19 15:48:27.405499+00
215	webhook	0001_initial	2021-05-19 15:48:27.484932+00
216	webhook	0002_webhook_name	2021-05-19 15:48:27.498518+00
217	sites	0001_initial	2021-05-19 15:48:27.504863+00
218	sites	0002_alter_domain_unique	2021-05-19 15:48:27.512109+00
219	site	0001_initial	2021-05-19 15:48:27.51899+00
220	site	0002_add_default_data	2021-05-19 15:48:27.560672+00
221	site	0003_sitesettings_description	2021-05-19 15:48:27.5675+00
222	site	0004_auto_20170221_0426	2021-05-19 15:48:27.580437+00
223	site	0005_auto_20170906_0556	2021-05-19 15:48:27.58774+00
224	site	0006_auto_20171025_0454	2021-05-19 15:48:27.596242+00
225	site	0007_auto_20171027_0856	2021-05-19 15:48:27.639575+00
226	site	0008_auto_20171027_0856	2021-05-19 15:48:27.658972+00
227	site	0009_auto_20171109_0849	2021-05-19 15:48:27.664994+00
228	site	0010_auto_20171113_0958	2021-05-19 15:48:27.671252+00
229	site	0011_auto_20180108_0814	2021-05-19 15:48:27.691895+00
230	page	0001_initial	2021-05-19 15:48:27.700094+00
231	menu	0001_initial	2021-05-19 15:48:27.749122+00
232	menu	0002_auto_20180319_0412	2021-05-19 15:48:27.803914+00
233	site	0012_auto_20180405_0757	2021-05-19 15:48:27.881618+00
234	menu	0003_auto_20180405_0854	2021-05-19 15:48:27.936812+00
235	site	0013_assign_default_menus	2021-05-19 15:48:27.982383+00
236	site	0014_handle_taxes	2021-05-19 15:48:28.001319+00
237	site	0015_sitesettings_handle_stock_by_default	2021-05-19 15:48:28.009264+00
238	site	0016_auto_20180719_0520	2021-05-19 15:48:28.017239+00
239	site	0017_auto_20180803_0528	2021-05-19 15:48:28.067718+00
240	product	0055_auto_20180321_0417	2021-05-19 15:48:28.126315+00
241	product	0056_auto_20180330_0321	2021-05-19 15:48:28.321007+00
242	product	0057_auto_20180403_0852	2021-05-19 15:48:28.337659+00
243	product	0058_auto_20180329_0142	2021-05-19 15:48:28.476542+00
244	product	0059_generate_variant_name_from_attrs	2021-05-19 15:48:28.517857+00
245	product	0060_collection_is_published	2021-05-19 15:48:28.532501+00
246	product	0061_product_taxes	2021-05-19 15:48:28.569252+00
247	product	0062_sortable_models	2021-05-19 15:48:28.71177+00
248	product	0063_required_attr_value_order	2021-05-19 15:48:28.721581+00
249	product	0064_productvariant_handle_stock	2021-05-19 15:48:28.738853+00
250	product	0065_auto_20180719_0520	2021-05-19 15:48:28.760513+00
251	product	0066_auto_20180803_0528	2021-05-19 15:48:29.207381+00
252	site	0018_sitesettings_homepage_collection	2021-05-19 15:48:29.304918+00
253	site	0019_sitesettings_default_weight_unit	2021-05-19 15:48:29.319465+00
254	site	0020_auto_20190301_0336	2021-05-19 15:48:29.330755+00
255	site	0021_auto_20190326_0521	2021-05-19 15:48:29.361971+00
256	site	0022_sitesettings_company_address	2021-05-19 15:48:29.407386+00
257	site	0023_auto_20191007_0835	2021-05-19 15:48:29.45081+00
258	site	0024_sitesettings_customer_set_password_url	2021-05-19 15:48:29.471672+00
259	site	0025_auto_20191024_0552	2021-05-19 15:48:29.520882+00
260	shipping	0009_auto_20180629_1055	2021-05-19 15:48:29.529379+00
261	shipping	0010_auto_20180719_0520	2021-05-19 15:48:29.53701+00
262	shipping	0011_auto_20180802_1238	2021-05-19 15:48:29.546182+00
263	shipping	0012_remove_legacy_shipping_methods	2021-05-19 15:48:29.59313+00
264	shipping	0013_auto_20180822_0721	2021-05-19 15:48:29.801755+00
265	shipping	0014_auto_20180920_0956	2021-05-19 15:48:29.821108+00
266	shipping	0015_auto_20190305_0640	2021-05-19 15:48:29.832817+00
267	shipping	0016_shippingmethod_meta	2021-05-19 15:48:29.846734+00
268	shipping	0017_django_price_2	2021-05-19 15:48:29.891047+00
269	product	0067_remove_product_is_featured	2021-05-19 15:48:29.9086+00
270	product	0068_auto_20180822_0720	2021-05-19 15:48:30.095903+00
271	product	0069_auto_20180912_0326	2021-05-19 15:48:30.106029+00
272	product	0070_auto_20180912_0329	2021-05-19 15:48:30.167943+00
273	product	0071_attributechoicevalue_value	2021-05-19 15:48:30.178362+00
274	product	0072_auto_20180925_1048	2021-05-19 15:48:30.457935+00
275	product	0073_auto_20181010_0729	2021-05-19 15:48:30.649053+00
276	product	0074_auto_20181010_0730	2021-05-19 15:48:30.934834+00
277	product	0075_auto_20181010_0842	2021-05-19 15:48:31.123162+00
278	product	0076_auto_20181012_1146	2021-05-19 15:48:31.133626+00
279	product	0077_generate_versatile_background_images	2021-05-19 15:48:31.135919+00
280	product	0078_auto_20181120_0437	2021-05-19 15:48:31.160341+00
281	product	0079_default_tax_rate_instead_of_empty_field	2021-05-19 15:48:31.211549+00
282	product	0080_collection_published_date	2021-05-19 15:48:31.229514+00
283	product	0080_auto_20181214_0440	2021-05-19 15:48:31.258076+00
284	product	0081_merge_20181215_1659	2021-05-19 15:48:31.260577+00
285	product	0081_auto_20181218_0024	2021-05-19 15:48:31.307168+00
286	product	0082_merge_20181219_1440	2021-05-19 15:48:31.30954+00
287	product	0083_auto_20190104_0443	2021-05-19 15:48:31.338906+00
288	product	0084_auto_20190122_0113	2021-05-19 15:48:31.389136+00
289	product	0085_auto_20190125_0025	2021-05-19 15:48:31.396654+00
290	product	0086_product_publication_date	2021-05-19 15:48:31.444008+00
291	product	0087_auto_20190208_0326	2021-05-19 15:48:31.461268+00
292	product	0088_auto_20190220_1928	2021-05-19 15:48:31.478428+00
293	product	0089_auto_20190225_0252	2021-05-19 15:48:31.74335+00
294	product	0090_auto_20190328_0608	2021-05-19 15:48:31.799781+00
295	product	0091_auto_20190402_0853	2021-05-19 15:48:31.90562+00
296	product	0092_auto_20190507_0309	2021-05-19 15:48:32.057076+00
297	product	0093_auto_20190521_0124	2021-05-19 15:48:32.241107+00
298	product	0094_auto_20190618_0430	2021-05-19 15:48:32.266796+00
299	product	0095_auto_20190618_0842	2021-05-19 15:48:32.333674+00
300	product	0096_auto_20190719_0339	2021-05-19 15:48:32.348014+00
301	product	0097_auto_20190719_0458	2021-05-19 15:48:32.412641+00
302	product	0098_auto_20190719_0733	2021-05-19 15:48:32.622948+00
303	product	0099_auto_20190719_0745	2021-05-19 15:48:32.677624+00
304	product	0096_raw_html_to_json	2021-05-19 15:48:32.828395+00
305	product	0100_merge_20190719_0803	2021-05-19 15:48:32.831713+00
306	product	0101_auto_20190719_0839	2021-05-19 15:48:32.951656+00
307	product	0102_migrate_data_enterprise_grade_attributes	2021-05-19 15:48:33.183409+00
308	product	0103_schema_data_enterprise_grade_attributes	2021-05-19 15:48:34.116899+00
309	product	0104_fix_invalid_attributes_map	2021-05-19 15:48:34.374617+00
310	product	0105_product_minimal_variant_price	2021-05-19 15:48:34.490782+00
311	product	0106_django_prices_2	2021-05-19 15:48:34.606321+00
312	product	0107_attributes_map_to_m2m	2021-05-19 15:48:35.202788+00
313	product	0108_auto_20191003_0422	2021-05-19 15:48:35.28683+00
314	product	0109_auto_20191006_1433	2021-05-19 15:48:35.340922+00
315	product	0110_auto_20191108_0340	2021-05-19 15:48:35.470104+00
316	account	0034_service_account_token	2021-05-19 15:48:35.585139+00
317	account	0035_staffnotificationrecipient	2021-05-19 15:48:35.646304+00
318	account	0036_auto_20191209_0407	2021-05-19 15:48:35.669791+00
319	account	0037_auto_20191219_0944	2021-05-19 15:48:35.693046+00
320	warehouse	0001_initial	2021-05-19 15:48:36.017319+00
321	product	0111_auto_20191209_0437	2021-05-19 15:48:36.071155+00
322	product	0112_auto_20200129_0050	2021-05-19 15:48:36.331322+00
323	product	0113_auto_20200129_0717	2021-05-19 15:48:36.852226+00
324	product	0114_auto_20200129_0815	2021-05-19 15:48:37.027139+00
325	product	0115_auto_20200221_0257	2021-05-19 15:48:37.671039+00
326	giftcard	0001_initial	2021-05-19 15:48:37.732189+00
327	order	0071_order_gift_cards	2021-05-19 15:48:37.796623+00
328	order	0072_django_price_2	2021-05-19 15:48:38.030995+00
329	order	0073_auto_20190829_0249	2021-05-19 15:48:38.291074+00
330	order	0074_auto_20190930_0731	2021-05-19 15:48:38.355959+00
331	order	0075_auto_20191006_1433	2021-05-19 15:48:38.387135+00
332	order	0076_auto_20191018_0554	2021-05-19 15:48:38.43372+00
333	order	0077_auto_20191118_0606	2021-05-19 15:48:38.473879+00
334	order	0078_auto_20200221_0257	2021-05-19 15:48:38.575424+00
335	payment	0003_rename_payment_method_to_payment	2021-05-19 15:48:38.791053+00
336	payment	0004_auto_20181206_0031	2021-05-19 15:48:38.814993+00
337	payment	0005_auto_20190104_0443	2021-05-19 15:48:38.837417+00
338	payment	0006_auto_20190109_0358	2021-05-19 15:48:38.848584+00
339	payment	0007_auto_20190206_0938	2021-05-19 15:48:38.860586+00
340	payment	0007_auto_20190125_0242	2021-05-19 15:48:38.883789+00
341	payment	0008_merge_20190214_0447	2021-05-19 15:48:38.886314+00
342	payment	0009_convert_to_partially_charged_and_partially_refunded	2021-05-19 15:48:38.945774+00
343	payment	0010_auto_20190220_2001	2021-05-19 15:48:39.11954+00
344	checkout	0016_auto_20190112_0506	2021-05-19 15:48:39.147782+00
345	checkout	0017_auto_20190130_0207	2021-05-19 15:48:39.178674+00
346	checkout	0018_auto_20190410_0132	2021-05-19 15:48:39.535182+00
347	checkout	0019_checkout_gift_cards	2021-05-19 15:48:39.597585+00
348	checkout	0020_auto_20190723_0722	2021-05-19 15:48:39.661007+00
349	checkout	0021_django_price_2	2021-05-19 15:48:39.692537+00
350	checkout	0022_auto_20191219_1137	2021-05-19 15:48:39.721632+00
351	checkout	0023_checkout_country	2021-05-19 15:48:39.757301+00
352	checkout	0024_auto_20200120_0154	2021-05-19 15:48:39.789466+00
353	checkout	0025_auto_20200221_0257	2021-05-19 15:48:39.856297+00
354	account	0038_auto_20200123_0034	2021-05-19 15:48:40.077151+00
355	account	0039_auto_20200221_0257	2021-05-19 15:48:40.152506+00
356	core	0001_migrate_metadata	2021-05-19 15:48:40.983359+00
357	account	0040_auto_20200415_0443	2021-05-19 15:48:41.049792+00
358	account	0041_permissions_to_groups	2021-05-19 15:48:41.113522+00
359	account	0040_auto_20200225_0237	2021-05-19 15:48:41.171669+00
360	account	0041_merge_20200421_0529	2021-05-19 15:48:41.174346+00
361	account	0042_merge_20200422_0555	2021-05-19 15:48:41.176689+00
362	account	0043_rename_service_account_to_app	2021-05-19 15:48:41.425894+00
363	webhook	0003_unmount_service_account	2021-05-19 15:48:41.501109+00
364	account	0044_unmount_app_and_app_token	2021-05-19 15:48:41.712187+00
365	account	0045_auto_20200427_0425	2021-05-19 15:48:41.775557+00
366	account	0046_user_jwt_token_key	2021-05-19 15:48:41.802751+00
367	account	0047_auto_20200810_1415	2021-05-19 15:48:41.878737+00
368	app	0001_initial	2021-05-19 15:48:42.110039+00
369	app	0002_auto_20200702_0945	2021-05-19 15:48:42.27124+00
370	app	0003_auto_20200810_1415	2021-05-19 15:48:42.299726+00
371	auth	0012_alter_user_first_name_max_length	2021-05-19 15:48:42.315009+00
372	checkout	0026_auto_20200709_1102	2021-05-19 15:48:42.346058+00
373	checkout	0027_auto_20200810_1415	2021-05-19 15:48:42.572553+00
374	checkout	0028_auto_20200824_1019	2021-05-19 15:48:42.641598+00
375	checkout	0029_auto_20200904_0529	2021-05-19 15:48:42.681293+00
376	csv	0001_initial	2021-05-19 15:48:42.813148+00
377	csv	0002_exportfile_message	2021-05-19 15:48:42.852569+00
378	csv	0003_auto_20200810_1415	2021-05-19 15:48:42.879083+00
379	discount	0004_auto_20170206_0407	2021-05-19 15:48:43.249983+00
380	discount	0005_auto_20170919_0839	2021-05-19 15:48:43.425489+00
381	discount	0006_auto_20171129_1004	2021-05-19 15:48:43.464815+00
382	discount	0007_auto_20180108_0814	2021-05-19 15:48:43.942026+00
383	discount	0008_sale_collections	2021-05-19 15:48:44.009111+00
384	discount	0009_auto_20180719_0520	2021-05-19 15:48:44.051612+00
385	discount	0010_auto_20180724_1251	2021-05-19 15:48:44.645125+00
386	discount	0011_auto_20180803_0528	2021-05-19 15:48:44.74462+00
387	discount	0012_auto_20190329_0836	2021-05-19 15:48:44.829922+00
388	discount	0013_auto_20190618_0733	2021-05-19 15:48:44.943563+00
389	discount	0014_auto_20190701_0402	2021-05-19 15:48:45.199442+00
390	discount	0015_voucher_min_quantity_of_products	2021-05-19 15:48:45.229575+00
391	discount	0016_auto_20190716_0330	2021-05-19 15:48:45.327139+00
392	discount	0017_django_price_2	2021-05-19 15:48:45.391191+00
393	discount	0018_auto_20190827_0315	2021-05-19 15:48:45.486893+00
394	discount	0019_auto_20200217_0350	2021-05-19 15:48:45.574978+00
395	discount	0020_auto_20200709_1102	2021-05-19 15:48:45.610722+00
396	discount	0021_auto_20200902_1249	2021-05-19 15:48:45.700017+00
397	django_prices_openexchangerates	0001_initial	2021-05-19 15:48:45.709726+00
398	django_prices_openexchangerates	0002_auto_20160329_0702	2021-05-19 15:48:45.720692+00
399	django_prices_openexchangerates	0003_auto_20161018_0707	2021-05-19 15:48:45.736717+00
400	django_prices_openexchangerates	0004_auto_20170316_0944	2021-05-19 15:48:45.743619+00
401	django_prices_openexchangerates	0005_auto_20190124_1008	2021-05-19 15:48:45.750796+00
402	django_prices_vatlayer	0001_initial	2021-05-19 15:48:45.758122+00
403	django_prices_vatlayer	0002_ratetypes	2021-05-19 15:48:45.765974+00
404	django_prices_vatlayer	0003_auto_20180316_1053	2021-05-19 15:48:45.774865+00
405	giftcard	0002_auto_20190814_0413	2021-05-19 15:48:45.93753+00
406	giftcard	0003_auto_20200217_0350	2021-05-19 15:48:45.964747+00
407	giftcard	0004_auto_20200902_1249	2021-05-19 15:48:46.276177+00
408	warehouse	0002_auto_20200123_0036	2021-05-19 15:48:46.352803+00
409	warehouse	0003_warehouse_slug	2021-05-19 15:48:46.474087+00
410	warehouse	0004_auto_20200129_0717	2021-05-19 15:48:46.50847+00
411	warehouse	0005_auto_20200204_0722	2021-05-19 15:48:46.587505+00
412	warehouse	0006_auto_20200228_0519	2021-05-19 15:48:46.662826+00
413	order	0079_auto_20200304_0752	2021-05-19 15:48:46.75443+00
414	order	0080_invoice	2021-05-19 15:48:46.829801+00
415	order	0081_auto_20200406_0456	2021-05-19 15:48:46.904582+00
416	warehouse	0007_auto_20200406_0341	2021-05-19 15:48:47.260398+00
417	order	0082_fulfillmentline_stock	2021-05-19 15:48:47.339198+00
418	order	0079_auto_20200225_0237	2021-05-19 15:48:47.37028+00
419	order	0081_merge_20200309_0952	2021-05-19 15:48:47.372826+00
420	order	0083_merge_20200421_0529	2021-05-19 15:48:47.375103+00
421	order	0084_auto_20200522_0522	2021-05-19 15:48:47.413368+00
422	order	0085_delete_invoice	2021-05-19 15:48:47.418999+00
423	invoice	0001_initial	2021-05-19 15:48:47.565625+00
424	invoice	0002_invoice_message	2021-05-19 15:48:47.600761+00
425	invoice	0003_auto_20200713_1311	2021-05-19 15:48:47.640303+00
426	invoice	0004_auto_20200810_1415	2021-05-19 15:48:47.72583+00
427	menu	0004_sort_order_index	2021-05-19 15:48:47.751178+00
428	menu	0005_auto_20180719_0520	2021-05-19 15:48:47.759719+00
429	menu	0006_auto_20180803_0528	2021-05-19 15:48:47.853818+00
430	menu	0007_auto_20180807_0547	2021-05-19 15:48:47.938157+00
431	menu	0008_menu_json_content_new	2021-05-19 15:48:48.180106+00
432	menu	0009_remove_menu_json_content	2021-05-19 15:48:48.189189+00
433	menu	0010_auto_20180913_0841	2021-05-19 15:48:48.198937+00
434	menu	0011_auto_20181204_0004	2021-05-19 15:48:48.20743+00
435	menu	0012_auto_20190104_0443	2021-05-19 15:48:48.216+00
436	menu	0013_auto_20190507_0309	2021-05-19 15:48:48.290477+00
437	menu	0014_auto_20190523_0759	2021-05-19 15:48:48.315757+00
438	menu	0015_auto_20190725_0811	2021-05-19 15:48:48.342752+00
439	menu	0016_auto_20200217_0350	2021-05-19 15:48:48.353501+00
440	menu	0017_remove_menu_json_content	2021-05-19 15:48:48.363265+00
441	menu	0018_auto_20200709_1102	2021-05-19 15:48:48.395202+00
442	menu	0019_menu_slug	2021-05-19 15:48:48.494127+00
443	order	0086_auto_20200716_1226	2021-05-19 15:48:48.534214+00
444	order	0087_auto_20200810_1415	2021-05-19 15:48:48.707512+00
445	order	0088_auto_20200812_1101	2021-05-19 15:48:48.74536+00
446	order	0089_auto_20200902_1249	2021-05-19 15:48:49.236464+00
447	page	0002_auto_20180321_0417	2021-05-19 15:48:49.252453+00
448	page	0003_auto_20180719_0520	2021-05-19 15:48:49.259748+00
449	page	0004_auto_20180803_0528	2021-05-19 15:48:49.34501+00
450	page	0005_auto_20190208_0456	2021-05-19 15:48:49.362108+00
451	page	0006_auto_20190220_1928	2021-05-19 15:48:49.37203+00
452	page	0007_auto_20190225_0252	2021-05-19 15:48:49.398815+00
453	page	0008_raw_html_to_json	2021-05-19 15:48:49.55894+00
454	page	0009_auto_20191108_0402	2021-05-19 15:48:49.567947+00
455	page	0010_auto_20200129_0717	2021-05-19 15:48:49.585342+00
456	page	0011_auto_20200217_0350	2021-05-19 15:48:49.59471+00
457	page	0012_auto_20200709_1102	2021-05-19 15:48:49.602543+00
458	page	0013_update_publication_date	2021-05-19 15:48:49.679465+00
459	page	0014_add_metadata	2021-05-19 15:48:49.695851+00
460	payment	0011_auto_20190516_0901	2021-05-19 15:48:49.712384+00
461	payment	0012_transaction_customer_id	2021-05-19 15:48:49.72944+00
462	payment	0013_auto_20190813_0735	2021-05-19 15:48:49.74566+00
463	payment	0014_django_price_2	2021-05-19 15:48:49.802077+00
464	payment	0015_auto_20200203_1116	2021-05-19 15:48:49.851268+00
465	payment	0016_auto_20200423_0314	2021-05-19 15:48:49.940628+00
466	payment	0017_payment_payment_method_type	2021-05-19 15:48:49.997652+00
467	payment	0018_auto_20200810_1415	2021-05-19 15:48:50.01297+00
468	payment	0019_auto_20200812_1101	2021-05-19 15:48:50.119657+00
469	payment	0020_auto_20200902_1249	2021-05-19 15:48:50.213289+00
470	payment	0021_transaction_searchable_key	2021-05-19 15:48:50.231585+00
471	plugins	0003_auto_20200429_0142	2021-05-19 15:48:50.489855+00
472	plugins	0004_drop_support_for_env_vatlayer_access_key	2021-05-19 15:48:50.566314+00
473	plugins	0005_auto_20200810_1415	2021-05-19 15:48:50.574451+00
474	plugins	0006_auto_20200909_1253	2021-05-19 15:48:50.581336+00
475	product	0116_auto_20200225_0237	2021-05-19 15:48:50.617172+00
476	product	0117_auto_20200423_0737	2021-05-19 15:48:50.639557+00
477	product	0118_populate_product_variant_price	2021-05-19 15:48:50.93043+00
478	product	0119_auto_20200709_1102	2021-05-19 15:48:51.017713+00
479	product	0120_auto_20200714_0539	2021-05-19 15:48:51.535467+00
480	product	0121_auto_20200810_1415	2021-05-19 15:48:52.591887+00
481	product	0122_auto_20200828_1135	2021-05-19 15:48:52.715627+00
482	product	0123_auto_20200904_1251	2021-05-19 15:48:52.967848+00
483	product	0124_auto_20200909_0904	2021-05-19 15:48:53.18058+00
484	product	0125_auto_20200916_1511	2021-05-19 15:48:53.235265+00
485	product	0126_product_default_variant	2021-05-19 15:48:53.388047+00
486	product	0127_auto_20201001_0933	2021-05-19 15:48:53.465217+00
487	product	0128_update_publication_date	2021-05-19 15:48:53.611108+00
488	product	0129_add_product_types_and_attributes_perm	2021-05-19 15:48:54.079854+00
490	shipping	0018_default_zones_countries	2021-05-19 15:48:54.318981+00
491	shipping	0019_remove_shippingmethod_meta	2021-05-19 15:48:54.339304+00
492	shipping	0020_auto_20200902_1249	2021-05-19 15:48:54.402053+00
493	warehouse	0008_auto_20200430_0239	2021-05-19 15:48:54.485503+00
494	warehouse	0009_remove_invalid_allocation	2021-05-19 15:48:54.562269+00
495	warehouse	0010_auto_20200709_1102	2021-05-19 15:48:54.589404+00
496	warehouse	0011_auto_20200714_0539	2021-05-19 15:48:54.618427+00
497	webhook	0004_mount_app	2021-05-19 15:48:54.696842+00
498	webhook	0005_drop_manage_webhooks_permission	2021-05-19 15:48:54.783665+00
499	webhook	0006_auto_20200731_1440	2021-05-19 15:48:54.79577+00
500	wishlist	0001_initial	2021-05-19 15:48:55.129372+00
501	account	0014_auto_20171129_1004	2021-05-19 15:48:55.147802+00
502	account	0004_auto_20160114_0419	2021-05-19 15:48:55.149458+00
503	account	0001_initial	2021-05-19 15:48:55.151385+00
504	account	0010_auto_20170919_0839	2021-05-19 15:48:55.153007+00
505	account	0013_auto_20171120_0521	2021-05-19 15:48:55.15445+00
506	account	0007_auto_20161115_0940	2021-05-19 15:48:55.155902+00
507	account	0009_auto_20170206_0407	2021-05-19 15:48:55.157333+00
508	account	0011_auto_20171110_0552	2021-05-19 15:48:55.158742+00
509	account	0005_auto_20160205_0651	2021-05-19 15:48:55.160138+00
510	account	0003_auto_20151104_1102	2021-05-19 15:48:55.161575+00
511	account	0012_auto_20171117_0846	2021-05-19 15:48:55.162969+00
512	account	0006_auto_20160829_0819	2021-05-19 15:48:55.164333+00
513	account	0008_auto_20161115_1011	2021-05-19 15:48:55.165778+00
514	account	0015_auto_20171213_0734	2021-05-19 15:48:55.167203+00
515	account	0016_auto_20180108_0814	2021-05-19 15:48:55.168553+00
516	account	0002_auto_20150907_0602	2021-05-19 15:48:55.169997+00
517	checkout	0003_auto_20170906_0556	2021-05-19 15:48:55.171659+00
518	checkout	0001_initial	2021-05-19 15:48:55.173163+00
519	checkout	0006_auto_20180221_0825	2021-05-19 15:48:55.174532+00
520	checkout	fix_empty_data_in_lines	2021-05-19 15:48:55.17598+00
521	checkout	0001_auto_20170113_0435	2021-05-19 15:48:55.177417+00
522	checkout	0004_auto_20171129_1004	2021-05-19 15:48:55.17878+00
523	checkout	0002_auto_20170206_0407	2021-05-19 15:48:55.180184+00
524	checkout	0002_auto_20161014_1221	2021-05-19 15:48:55.181498+00
525	checkout	0005_auto_20180108_0814	2021-05-19 15:48:55.183081+00
526	rest_framework_api_key	0001_initial	2021-07-01 14:38:05.295225+00
527	rest_framework_api_key	0002_auto_20190529_2243	2021-07-01 14:38:05.333167+00
528	rest_framework_api_key	0003_auto_20190623_1952	2021-07-01 14:38:05.342273+00
529	rest_framework_api_key	0004_prefix_hashed_key	2021-07-01 14:38:05.457253+00
531	product	0130_product_mpn	2021-07-08 15:02:48.708383+00
532	product	0131_auto_20210713_1404	2021-07-13 14:04:58.36504+00
533	product	0132_product_item_num_id	2021-07-29 20:21:53.85934+00
538	fusion_online	0001_initial	2021-08-04 17:44:55.824949+00
539	fusion_online	0002_offer_tariff	2021-08-06 15:39:37.671684+00
540	fusion_online	0003_auto_20210809_1527	2021-08-09 15:29:58.376945+00
541	fusion_online	0004_auto_20210809_1529	2021-08-09 15:29:58.407139+00
542	fusion_online	0005_rfqlineitem_rfqsubmission	2021-08-10 17:33:26.2107+00
543	fusion_online	0006_auto_20210810_1733	2021-08-10 17:33:26.262428+00
544	fusion_online	0005_shippingaddress	2021-08-11 16:54:08.59367+00
545	fusion_online	0007_merge_20210811_1653	2021-08-11 16:54:08.621656+00
546	fusion_online	0008_auto_20210811_1811	2021-08-11 18:12:12.142851+00
547	fusion_online	0009_rfqresponse	2021-08-11 19:15:16.868255+00
548	product	0133_auto_20210812_1739	2021-08-12 17:40:11.89712+00
549	fusion_online	0010_auto_20210818_2042	2021-08-23 15:50:08.779154+00
550	fusion_online	0011_auto_20210819_1627	2021-08-23 15:50:08.806623+00
551	fusion_online	0012_auto_20210823_1603	2021-08-23 16:04:42.218634+00
552	fusion_online	0013_auto_20210903_1854	2021-09-08 20:30:23.19719+00
\.


--
-- Data for Name: django_prices_openexchangerates_conversionrate; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.django_prices_openexchangerates_conversionrate (id, to_currency, rate, modified_at) FROM stdin;
\.


--
-- Data for Name: django_prices_vatlayer_ratetypes; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.django_prices_vatlayer_ratetypes (id, types) FROM stdin;
\.


--
-- Data for Name: django_prices_vatlayer_vat; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.django_prices_vatlayer_vat (id, country_code, data) FROM stdin;
\.


--
-- Data for Name: django_site; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.django_site (id, domain, name) FROM stdin;
1	localhost:8000	RocketChips
\.


--
-- Data for Name: fusion_online_offer; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.fusion_online_offer (id, type, lead_time_days, date_added, date_code, comment, vendor_type, vendor_region, product_variant_id, tariff_rate, coo) FROM stdin;
1	vendor_offer	0	1625254322	2 days	test	8	9	21	\N	
2	vendor_offer	0	1625254322	2 days		8	9	23	\N	
3	vendor_offer	10	1625254322	2 days		8	9	24	\N	
4	vendor_offer	10	1625254322	2 days		8	9	46	\N	
5	vendor_offer	10	1625254322	2 days		8	9	47	\N	
6	vendor_offer	10	1625254322	2 days		8	9	48	\N	
7	vendor_offer	10	1625254322	2 days		8	9	49	\N	
8	vendor_offer	10	1625254322	2 days		8	9	50	\N	
9	vendor_offer	10	1625254322	2 days		8	9	51	0	
10	VENDOR_OFFER	10	1625254322	2 days				54	0	
11	VENDOR_OFFER	0	1625254322	2 days				55	0	
\.


--
-- Data for Name: fusion_online_rfqlineitem; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.fusion_online_rfqlineitem (id, mpn, mcode, quantity, target, date_code, comment, cipn, commodity_code, offer_id, rfq_submission_id) FROM stdin;
1	AAA	Intel	1	12.0012500000000006	2 days	string	123	CPU_INTEL	123	2
2	AAA	Intel	1	12.0012500000000006	2 days	string	123	CPU_INTEL	123	3
3	CCCC	Intel	2	12.0012500000000006	2 days	string	1234	CPU_INTEL	1234	3
\.


--
-- Data for Name: fusion_online_rfqresponse; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.fusion_online_rfqresponse (id, response, mpn, mcode, quantity, offer_price, date_code, comment, coo, lead_time_days, offer_id, line_item_id) FROM stdin;
1	OFFER	CCCC	Intel	2	12.0012500000000006	2 days	string	China	0	1234	3
2	OFFER	CCCC	Intel	2	12.0012500000000006	2 days	string	China	0	1234	2
\.


--
-- Data for Name: fusion_online_rfqsubmission; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.fusion_online_rfqsubmission (id, date_added, user_id) FROM stdin;
2	2021-08-10 18:52:04.284713+00	10
3	2021-08-10 19:37:22.132635+00	11
\.


--
-- Data for Name: fusion_online_shippingaddress; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.fusion_online_shippingaddress (id, customer_id, ship_to_name, ship_via, vat_id, ship_to_num, validation_message, created, updated, address_id) FROM stdin;
36	4535250721	home	UPS	44788801	\N	\N	2021-08-23 16:17:35.98743+00	2021-08-23 16:17:35.98746+00	65
37	4535250721	Receiving Facility 1	UPS	44788801	\N	\N	2021-08-24 15:50:48.874751+00	2021-08-24 15:50:48.874772+00	66
\.


--
-- Data for Name: giftcard_giftcard; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.giftcard_giftcard (id, code, created, start_date, end_date, last_used_on, is_active, initial_balance_amount, current_balance_amount, user_id, currency) FROM stdin;
\.


--
-- Data for Name: invoice_invoice; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.invoice_invoice (id, private_metadata, metadata, status, created_at, updated_at, number, created, external_url, invoice_file, order_id, message) FROM stdin;
1	{}	{}	success	2021-07-21 19:21:12.407852+00	2021-07-21 19:21:13.126818+00	1/07/2021	2021-07-21 19:21:12.41899+00	\N	invoices/invoice-1/07/2021-order-5-4108c3ac-034b-4a48-b488-b6f5fd59f840.pdf	5	\N
\.


--
-- Data for Name: invoice_invoiceevent; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.invoice_invoiceevent (id, date, type, parameters, invoice_id, order_id, user_id) FROM stdin;
1	2021-07-21 19:21:13.131455+00	requested	{"number": null}	\N	5	1
\.


--
-- Data for Name: menu_menu; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.menu_menu (id, name, slug) FROM stdin;
2	footer	footer
1	navbar	navbar
\.


--
-- Data for Name: menu_menuitem; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.menu_menuitem (id, name, sort_order, url, lft, rght, tree_id, level, category_id, collection_id, menu_id, page_id, parent_id) FROM stdin;
1	CPUs	0	\N	1	2	1	0	1	\N	1	\N	\N
\.


--
-- Data for Name: menu_menuitemtranslation; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.menu_menuitemtranslation (id, language_code, name, menu_item_id) FROM stdin;
\.


--
-- Data for Name: order_fulfillment; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.order_fulfillment (id, tracking_number, created, order_id, fulfillment_order, status, metadata, private_metadata) FROM stdin;
1	123456789	2021-07-21 19:12:15.218151+00	5	1	fulfilled	{}	{}
\.


--
-- Data for Name: order_fulfillmentline; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.order_fulfillmentline (id, order_line_id, quantity, fulfillment_id, stock_id) FROM stdin;
1	6	2	1	4
2	7	1	1	1
\.


--
-- Data for Name: order_order; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.order_order (id, created, tracking_client_id, user_email, token, billing_address_id, shipping_address_id, user_id, total_net_amount, discount_amount, discount_name, voucher_id, language_code, shipping_price_gross_amount, total_gross_amount, shipping_price_net_amount, status, shipping_method_name, shipping_method_id, display_gross_prices, translated_discount_name, customer_note, weight, checkout_token, currency, metadata, private_metadata) FROM stdin;
3	2021-07-21 18:48:54.307413+00	8cf6e81f-4afd-567d-945b-d7bcb03a46fc	customer@example.com	422ff6c0-26fe-4eda-aeba-9227fda9b2c9	15	14	5	530.000	0.000	\N	\N	en	5.000	530.000	5.000	unfulfilled	Standard Shipping	1	t	\N		0	6965ca16-f1f7-4615-8609-d1988fb8ba8e	USD	{}	{}
4	2021-07-21 18:52:46.735885+00	8cf6e81f-4afd-567d-945b-d7bcb03a46fc	customer@example.com	8e0f31a0-45ed-4255-864f-e4036d17b914	18	17	5	1807.230	0.000	\N	\N	en	5.000	1807.230	5.000	unfulfilled	Standard Shipping	1	t	\N		7000	fad92e57-ff95-4336-a7d0-c67f89580dbb	USD	{}	{}
2	2021-05-20 19:23:01.715304+00	ff1da619-a593-5b8d-8586-2198e0970640	maeghan.m.provencher@gmail.com	4c74ec7f-6816-40a0-b94b-37265e00304c	10	9	\N	5.000	0.000	\N	\N	en	5.000	5.000	5.000	canceled	Standard Shipping	1	t	\N		1000	8119b6a4-10cd-48f5-9545-eb6ef8ad5d53	USD	{}	{}
1	2021-05-20 19:21:22.134618+00	ff1da619-a593-5b8d-8586-2198e0970640	maeghan.m.provencher@gmail.com	9acbd85f-69da-423c-a39f-a483c0cd9379	7	6	\N	6.000	0.000	\N	\N	en	5.000	6.000	5.000	canceled	Standard Shipping	1	t	\N		1000	cdae3fcd-f2fb-43a2-a39e-cce170c3717b	USD	{}	{}
6	2021-08-11 15:44:18.285462+00	eee26949-bf47-59b3-8b31-8cf723650d1c	customer@example.com	bb6cb082-bb77-4f76-b013-70799631c5e8	25	24	5	215.000	0.000	\N	\N	en	5.000	215.000	5.000	unfulfilled	Standard Shipping	1	t	\N		0	0b0c5853-8d9f-4488-b73d-a3efd0ba0012	USD	{}	{}
5	2021-07-21 18:55:54.124946+00	8cf6e81f-4afd-567d-945b-d7bcb03a46fc	customer@example.com	ab05fd3c-fb05-4e61-97cb-f4c74f262a8e	21	20	5	2606.510	0.000	\N	\N	en	5.000	2606.510	5.000	fulfilled	Standard Shipping	1	t	\N		9000	0862744c-1506-4e13-a8ee-0c2a01b73ba7	USD	{}	{}
7	2021-08-11 17:04:55.654122+00	eee26949-bf47-59b3-8b31-8cf723650d1c	customer@example.com	e0179759-67ee-4e26-8167-6c46a846fd65	28	27	5	101.000	0.000	\N	\N	en	5.000	101.000	5.000	unfulfilled	Standard Shipping	1	t	\N		0	b2d0af70-6bc9-4e2f-964a-291dbf702d85	USD	{}	{}
\.


--
-- Data for Name: order_order_gift_cards; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.order_order_gift_cards (id, order_id, giftcard_id) FROM stdin;
\.


--
-- Data for Name: order_orderevent; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.order_orderevent (id, date, type, order_id, user_id, parameters) FROM stdin;
1	2021-05-20 19:21:22.151986+00	placed	1	\N	{}
2	2021-05-20 19:21:22.168548+00	payment_captured	1	\N	{"amount": "6.000", "payment_id": "charged", "payment_gateway": "mirumee.payments.dummy"}
3	2021-05-20 19:21:22.181778+00	order_fully_paid	1	\N	{}
4	2021-05-20 19:21:22.18328+00	email_sent	1	\N	{"email": "maeghan.m.provencher@gmail.com", "email_type": "payment_confirmation"}
5	2021-05-20 19:21:23.116063+00	email_sent	1	\N	{"email": "maeghan.m.provencher@gmail.com", "email_type": "order_confirmation"}
6	2021-05-20 19:23:01.729032+00	placed	2	\N	{}
7	2021-05-20 19:23:01.747993+00	payment_authorized	2	\N	{"amount": "5.000", "payment_id": "not-charged", "payment_gateway": "mirumee.payments.dummy"}
8	2021-05-20 19:23:01.859616+00	email_sent	2	\N	{"email": "maeghan.m.provencher@gmail.com", "email_type": "order_confirmation"}
9	2021-07-21 18:48:54.346558+00	placed	3	5	{}
10	2021-07-21 18:48:54.377475+00	payment_captured	3	5	{"amount": "530.000", "payment_id": "charged", "payment_gateway": "mirumee.payments.dummy"}
11	2021-07-21 18:48:54.412458+00	order_fully_paid	3	5	{}
12	2021-07-21 18:48:54.414374+00	email_sent	3	5	{"email": "customer@example.com", "email_type": "payment_confirmation"}
13	2021-07-21 18:52:46.760914+00	placed	4	5	{}
14	2021-07-21 18:52:46.783402+00	payment_captured	4	5	{"amount": "1807.230", "payment_id": "charged", "payment_gateway": "mirumee.payments.dummy"}
15	2021-07-21 18:52:46.799843+00	order_fully_paid	4	5	{}
16	2021-07-21 18:52:46.802133+00	email_sent	4	5	{"email": "customer@example.com", "email_type": "payment_confirmation"}
17	2021-07-21 18:55:54.14396+00	placed	5	5	{}
18	2021-07-21 18:55:54.15999+00	payment_captured	5	5	{"amount": "2606.510", "payment_id": "charged", "payment_gateway": "mirumee.payments.dummy"}
19	2021-07-21 18:55:54.18082+00	order_fully_paid	5	5	{}
20	2021-07-21 18:55:54.18501+00	email_sent	5	5	{"email": "customer@example.com", "email_type": "payment_confirmation"}
21	2021-07-21 19:12:15.291722+00	fulfillment_fulfilled_items	5	1	{"fulfilled_items": [1, 2]}
22	2021-07-21 19:12:15.359808+00	email_sent	5	1	{"email": "customer@example.com", "email_type": "fulfillment_confirmation"}
23	2021-07-21 19:12:33.072519+00	tracking_updated	5	1	{"fulfillment": "5-1", "tracking_number": "123456789"}
24	2021-07-21 19:21:13.129375+00	invoice_generated	5	1	{"invoice_number": "1/07/2021"}
25	2021-07-21 19:26:37.679522+00	canceled	2	1	{}
26	2021-07-21 19:26:37.712187+00	email_sent	2	1	{"email": "maeghan.m.provencher@gmail.com", "email_type": "order_cancel"}
27	2021-07-21 19:27:02.043542+00	canceled	1	1	{}
28	2021-07-21 19:27:02.076636+00	email_sent	1	1	{"email": "maeghan.m.provencher@gmail.com", "email_type": "order_cancel"}
29	2021-08-11 15:44:18.34326+00	placed	6	5	{}
30	2021-08-11 15:44:18.374506+00	payment_captured	6	5	{"amount": "215.000", "payment_id": "charged", "payment_gateway": "mirumee.payments.dummy"}
31	2021-08-11 15:44:18.39292+00	order_fully_paid	6	5	{}
32	2021-08-11 15:44:18.395432+00	email_sent	6	5	{"email": "customer@example.com", "email_type": "payment_confirmation"}
33	2021-08-11 17:04:55.697955+00	placed	7	5	{}
34	2021-08-11 17:04:55.718267+00	payment_captured	7	5	{"amount": "101.000", "payment_id": "charged", "payment_gateway": "mirumee.payments.dummy"}
35	2021-08-11 17:04:55.731919+00	order_fully_paid	7	5	{}
36	2021-08-11 17:04:55.733441+00	email_sent	7	5	{"email": "customer@example.com", "email_type": "payment_confirmation"}
\.


--
-- Data for Name: order_orderline; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.order_orderline (id, product_name, product_sku, quantity, unit_price_net_amount, unit_price_gross_amount, is_shipping_required, order_id, quantity_fulfilled, variant_id, tax_rate, translated_product_name, currency, translated_variant_name, variant_name) FROM stdin;
1	Intel Pentium Gold 7505 Processor A	1234	1	1.000	1.000	t	1	0	\N	0.00		USD		1234
2	Intel Pentium Gold 7505 Processor C	12345	1	0.000	0.000	t	2	0	\N	0.00		USD		12345
3	Intel® Celeron® Processor N3010	12345	5	105.000	105.000	t	3	0	7	0.00		USD		12345
4	Intel® Core™ i3-8100 Processor	1234	3	200.590	200.590	t	4	0	6	0.00		USD		1 day / 1
5	Intel® Xeon® Gold 6130T Processor	123456	1	1200.460	1200.460	t	4	0	8	0.00		USD		123456
6	Intel® Xeon® Gold 6130T Processor	123456	2	1200.460	1200.460	t	5	2	8	0.00		USD		123456
7	Intel® Core™ i3-8100 Processor	1234	1	200.590	200.590	t	5	1	6	0.00		USD		1 day / 1
8	Intel® Celeron® Processor N3010	12345	2	105.000	105.000	t	6	0	7	0.00		USD		4
9	GeForce RTX 3090 24GB XLR8 Gaming REVEL EPIC-X RGB Triple Fan Edition	432432	2	48.000	48.000	t	7	0	18	0.00		USD		4
\.


--
-- Data for Name: page_page; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.page_page (id, slug, title, content, created, is_published, publication_date, seo_description, seo_title, content_json, metadata, private_metadata) FROM stdin;
\.


--
-- Data for Name: page_pagetranslation; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.page_pagetranslation (id, seo_title, seo_description, language_code, title, content, page_id, content_json) FROM stdin;
\.


--
-- Data for Name: payment_payment; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.payment_payment (id, gateway, is_active, created, modified, charge_status, billing_first_name, billing_last_name, billing_company_name, billing_address_1, billing_address_2, billing_city, billing_city_area, billing_postal_code, billing_country_code, billing_country_area, billing_email, customer_ip_address, cc_brand, cc_exp_month, cc_exp_year, cc_first_digits, cc_last_digits, extra_data, token, currency, total, captured_amount, checkout_id, order_id, to_confirm, payment_method_type, return_url) FROM stdin;
4	mirumee.payments.dummy	t	2021-07-21 18:52:40.960778+00	2021-07-21 18:52:46.7262+00	fully-charged	Jane	Doe	ACME	123 Main St.		BOSTON		02124	US	MA	customer@example.com	172.19.0.1	dummy_visa	12	2222		1234	{"customer_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36"}	charged	USD	1807.230	1807.230	\N	4	f	card	http://localhost:9001/checkout/payment-confirm
1	mirumee.payments.dummy	t	2021-05-20 19:21:16.563078+00	2021-05-20 19:21:22.125879+00	fully-charged	Maeghan	Provencher		191 Maverick St.	Apt. 1L	BOSTON		02128	US	MA	maeghan.m.provencher@gmail.com	172.19.0.1	dummy_visa	12	2222		1234	{"customer_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"}	charged	USD	6.000	6.000	\N	1	f	card	http://localhost:9001/checkout/payment-confirm
2	mirumee.payments.dummy	t	2021-05-20 19:22:59.277875+00	2021-05-20 19:22:59.27791+00	not-charged	Maeghan	Provencher		191 Maverick St.	Apt. 1L	BOSTON		02128	US	MA	maeghan.m.provencher@gmail.com	172.19.0.1	dummy_visa	12	2222		1234	{"customer_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"}	not-charged	USD	5.000	0.000	\N	2	f	card	http://localhost:9001/checkout/payment-confirm
6	mirumee.payments.dummy	t	2021-08-11 15:44:10.468941+00	2021-08-11 15:44:18.261527+00	fully-charged	Jane	Doe	ACME	123 Main St.		BOSTON		02124	US	MA	customer@example.com	172.19.0.1	dummy_visa	12	2222		1234	{"customer_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36"}	charged	USD	215.000	215.000	\N	6	f	card	http://localhost:9001/checkout/payment-confirm
3	mirumee.payments.dummy	t	2021-07-21 18:48:52.041741+00	2021-07-21 18:48:54.296482+00	fully-charged	Jane	Doe	ACME	123 Main St.		BOSTON		02124	US	MA	customer@example.com	172.19.0.1	dummy_visa	12	2222		1234	{"customer_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36"}	charged	USD	530.000	530.000	\N	3	f	card	http://localhost:9001/checkout/payment-confirm
5	mirumee.payments.dummy	t	2021-07-21 18:55:51.387928+00	2021-07-21 18:55:54.117043+00	fully-charged	Jane	Doe	ACME	123 Main St.		BOSTON		02124	US	MA	customer@example.com	172.19.0.1	dummy_visa	12	2222		1234	{"customer_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36"}	charged	USD	2606.510	2606.510	\N	5	f	card	http://localhost:9001/checkout/payment-confirm
7	mirumee.payments.dummy	t	2021-08-11 17:03:33.454599+00	2021-08-11 17:04:55.645954+00	fully-charged	Jane	Doe	ACME	123 Main St.		BOSTON		02124	US	MA	customer@example.com	172.19.0.1	dummy_visa	12	2222		1234	{"customer_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36"}	charged	USD	101.000	101.000	\N	7	f	card	http://localhost:9001/checkout/payment-confirm
\.


--
-- Data for Name: payment_transaction; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.payment_transaction (id, created, token, kind, is_success, error, currency, amount, gateway_response, payment_id, customer_id, action_required, action_required_data, already_processed, searchable_key) FROM stdin;
1	2021-05-20 19:21:22.121904+00	charged	capture	t	\N	USD	6.000	{}	1	\N	f	{}	t	
2	2021-05-20 19:23:01.70805+00	not-charged	auth	t	\N	USD	5.000	{}	2	\N	f	{}	t	
3	2021-07-21 18:48:54.293261+00	charged	capture	t	\N	USD	530.000	{}	3	\N	f	{}	t	
4	2021-07-21 18:52:46.72436+00	charged	capture	t	\N	USD	1807.230	{}	4	\N	f	{}	t	
5	2021-07-21 18:55:54.115489+00	charged	capture	t	\N	USD	2606.510	{}	5	\N	f	{}	t	
6	2021-08-11 15:44:18.256233+00	charged	capture	t	\N	USD	215.000	{}	6	\N	f	{}	t	
7	2021-08-11 17:04:55.638923+00	charged	capture	t	\N	USD	101.000	{}	7	\N	f	{}	t	
\.


--
-- Data for Name: plugins_pluginconfiguration; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.plugins_pluginconfiguration (id, name, description, active, configuration, identifier) FROM stdin;
1			t	[{"name": "Store customers card", "type": "Boolean", "label": "Store customers card", "value": false, "help_text": "Determines if Saleor should store cards."}, {"name": "Automatic payment capture", "type": "Boolean", "label": "Automatic payment capture", "value": true, "help_text": "Determines if Saleor should automaticaly capture payments."}, {"name": "Supported currencies", "type": "String", "label": "Supported currencies", "value": "USD", "help_text": "Determines currencies supported by gateway. Please enter currency codes separated by a comma."}]	mirumee.payments.dummy_credit_card
\.


--
-- Data for Name: product_assignedproductattribute; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.product_assignedproductattribute (id, product_id, assignment_id) FROM stdin;
168	88	54
169	88	56
170	88	55
171	88	53
172	88	52
173	88	57
21	6	5
22	6	6
23	6	7
24	6	8
25	7	13
26	7	14
27	7	15
28	7	16
29	8	9
30	8	10
31	8	11
32	8	12
33	9	5
34	9	6
35	9	7
36	9	8
37	7	21
38	7	22
39	6	19
40	6	20
41	9	19
42	9	20
43	8	17
44	8	18
174	88	58
175	89	54
176	89	56
177	89	55
178	89	53
179	89	52
51	27	23
180	89	57
53	27	24
54	27	26
55	28	27
56	28	28
57	28	29
58	28	30
59	29	27
60	29	28
61	29	29
62	29	30
63	30	34
64	30	35
65	30	33
66	27	36
67	27	37
68	27	41
69	27	38
70	27	39
71	27	40
72	31	36
73	31	23
74	31	37
75	31	41
181	89	58
77	31	26
78	31	38
79	31	39
80	31	40
81	31	24
82	32	42
83	32	43
84	32	44
85	32	45
86	32	47
87	32	48
88	32	49
89	32	50
90	32	51
182	89	59
183	89	60
184	88	59
185	88	60
318	116	75
319	116	77
320	116	76
321	116	78
322	116	85
323	116	81
334	118	78
335	118	79
336	118	80
337	118	85
324	117	75
325	117	77
326	117	76
327	117	78
328	117	85
329	117	81
330	118	75
331	118	77
332	118	76
333	118	81
\.


--
-- Data for Name: product_assignedproductattribute_values; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.product_assignedproductattribute_values (id, assignedproductattribute_id, attributevalue_id) FROM stdin;
171	168	72
172	169	73
173	170	74
174	171	75
175	172	30
176	173	76
21	21	13
22	22	7
23	23	3
24	24	16
25	25	14
26	26	8
27	27	3
28	28	17
29	29	12
30	30	6
31	31	3
32	32	15
33	33	13
34	34	7
35	35	3
36	36	16
37	37	24
38	38	20
39	39	22
40	40	19
41	41	23
42	42	19
43	43	21
44	44	18
177	174	66
178	175	72
179	176	73
180	177	74
181	178	75
182	179	30
51	51	30
183	180	76
184	181	66
54	54	33
55	55	12
56	56	37
57	57	34
58	58	39
59	59	12
60	60	38
61	61	35
62	62	39
63	63	42
64	64	40
65	65	41
185	182	21
186	183	18
68	68	47
69	69	55
70	70	52
71	71	58
72	66	61
73	67	60
74	53	62
75	72	61
76	73	30
77	74	60
78	75	43
187	184	21
80	77	66
81	78	53
82	79	48
83	80	56
84	81	63
85	82	61
86	83	30
87	84	60
88	85	44
89	86	66
90	87	54
91	88	49
92	89	57
93	90	64
188	185	18
411	318	6
412	319	13
413	320	142
414	321	3
415	322	140
416	323	129
417	323	130
418	323	131
419	323	132
420	323	133
421	323	134
422	323	135
423	323	136
424	323	137
425	323	138
426	323	139
427	324	6
428	325	13
429	326	142
430	327	3
431	328	140
432	329	129
433	329	130
434	329	131
435	329	132
436	329	133
437	329	134
438	329	135
439	329	136
440	329	137
441	329	138
442	329	139
443	330	6
444	331	13
445	332	142
446	333	130
447	333	131
448	333	132
449	333	133
450	333	134
451	333	135
452	333	136
453	333	137
454	333	138
455	333	139
456	334	3
457	335	21
458	336	18
459	337	140
\.


--
-- Data for Name: product_assignedvariantattribute; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.product_assignedvariantattribute (id, variant_id, assignment_id) FROM stdin;
1	10	1
2	6	1
3	6	2
4	10	2
5	8	3
6	7	4
7	13	5
8	14	6
9	15	6
10	16	5
11	17	5
12	18	7
13	12	7
14	19	7
15	20	8
16	21	9
17	23	9
18	24	9
40	46	9
41	47	9
42	48	9
43	49	9
44	50	9
45	51	9
47	54	12
48	55	12
\.


--
-- Data for Name: product_assignedvariantattribute_values; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.product_assignedvariantattribute_values (id, assignedvariantattribute_id, attributevalue_id) FROM stdin;
1	1	25
2	2	25
3	3	26
4	4	27
5	5	26
6	6	29
7	7	26
8	8	28
9	9	27
10	10	26
11	11	27
12	12	29
13	13	26
14	14	27
15	15	26
16	16	79
17	17	79
18	18	79
40	40	79
41	41	79
42	42	79
43	43	79
44	44	79
45	45	79
47	47	79
48	48	79
\.


--
-- Data for Name: product_attribute; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.product_attribute (id, slug, name, metadata, private_metadata, input_type, available_in_grid, visible_in_storefront, filterable_in_dashboard, filterable_in_storefront, value_required, storefront_search_position, is_variant_only) FROM stdin;
9	lead-time	Lead time	{}	{}	dropdown	t	t	t	f	t	0	f
8	ordering-code	Ordering Code	{}	{}	dropdown	t	t	t	f	t	0	f
7	spec-code	Spec Code	{}	{}	dropdown	t	t	t	f	t	0	f
16	groupsfamily	Groups/Family	{}	{}	dropdown	t	t	t	t	t	0	f
17	memory-clock	Memory Clock	{}	{}	dropdown	t	t	t	t	t	0	f
18	memory	Memory	{}	{}	dropdown	t	t	t	t	t	0	f
1	cpu_family	Core Family	{}	{}	dropdown	t	t	t	t	t	0	f
5	cpu_type	Type	{}	{}	dropdown	t	t	t	t	t	0	f
6	cpu_model	Model	{}	{}	dropdown	t	t	t	f	t	0	f
20	gpu_line	Line	{}	{}	dropdown	t	t	t	t	t	0	f
21	gpu_packaging	Packaging	{}	{}	dropdown	t	t	t	t	t	0	f
22	gpu_model	Model	{}	{}	dropdown	t	t	t	t	t	0	f
12	gpu_interface	Interface	{}	{}	dropdown	t	t	t	t	t	0	f
11	gpu_cooling	Cooling	{}	{}	dropdown	t	t	t	t	t	0	f
23	gpu_memory_config	Memory Configutation	{}	{}	dropdown	t	t	t	t	t	0	f
4	mcode	Manufacturer	{}	{}	dropdown	t	t	t	t	t	0	f
19	memory_type	Type	{}	{}	dropdown	t	t	t	t	t	0	f
13	memory_density	Density	{}	{}	dropdown	t	t	t	t	t	0	f
14	memory_speed	Speed	{}	{}	dropdown	t	t	t	t	t	0	f
24	memory_ddr	DDR	{}	{}	dropdown	t	t	t	t	t	0	f
25	memory_rank_org	Rank	{}	{}	dropdown	t	t	t	t	t	0	f
15	storage_capacity	Capacity	{}	{}	dropdown	t	t	t	t	t	0	f
26	storage_class	Class	{}	{}	dropdown	t	t	t	t	t	0	f
27	storage_size	Size	{}	{}	dropdown	t	t	t	t	t	0	f
10	vendor	Vendor	{}	{}	dropdown	t	t	t	f	t	0	f
28	storage_type	Type	{}	{}	dropdown	t	t	t	t	t	0	f
29	primary-vendors	Primary Vendors	{}	{}	multiselect	t	f	t	t	t	0	f
30	status	Status	{}	{}	dropdown	t	f	t	t	t	0	f
\.


--
-- Data for Name: product_attributeproduct; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.product_attributeproduct (id, attribute_id, product_type_id, sort_order) FROM stdin;
5	5	3	0
6	1	3	1
7	4	3	2
8	6	3	3
9	5	2	0
10	1	2	1
11	4	2	2
12	6	2	3
13	5	4	0
14	1	4	1
15	4	4	2
16	6	4	3
17	8	2	4
18	7	2	5
19	8	3	4
20	7	3	5
21	8	4	4
22	7	4	5
23	11	5	0
24	6	5	1
26	4	5	3
27	5	6	0
28	13	6	1
29	4	6	2
30	14	6	3
33	4	7	0
34	15	7	1
35	5	7	2
36	5	5	4
37	1	5	5
38	18	5	6
39	17	5	7
40	19	5	8
41	16	5	9
42	5	8	0
43	11	8	1
44	1	8	2
45	16	8	3
47	4	8	5
48	18	8	6
49	17	8	7
50	19	8	8
51	6	8	9
52	11	9	0
53	12	9	1
54	20	9	2
55	23	9	3
56	22	9	4
57	21	9	5
58	4	9	6
59	8	9	7
60	7	9	8
61	4	10	0
62	24	10	1
63	13	10	2
64	25	10	3
65	14	10	4
66	19	10	5
67	8	10	6
68	7	10	7
69	4	11	0
70	8	11	1
71	7	11	2
72	15	11	3
73	26	11	4
74	27	11	5
75	1	12	0
76	6	12	1
77	5	12	2
78	4	12	3
79	8	12	4
80	7	12	5
81	29	12	6
82	29	9	9
83	29	10	8
84	29	11	6
85	30	12	7
86	30	9	10
87	30	11	7
88	30	10	9
\.


--
-- Data for Name: product_attributetranslation; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.product_attributetranslation (id, language_code, name, attribute_id) FROM stdin;
\.


--
-- Data for Name: product_attributevalue; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.product_attributevalue (id, name, attribute_id, slug, sort_order, value) FROM stdin;
6	Skylake	1	skylake	0	
7	Coffee Lake	1	coffee-lake	1	
8	Braswell	1	braswell	2	
12	Server	5	server	0	
13	Desktop	5	desktop	1	
14	Mobile	5	mobile	2	
15	6130T	6	6130t	0	
16	i3-8100	6	i3-8100	1	
17	N3010	6	n3010	2	
18	SR3J8	7	sr3j8	0	
19	SR3N5	7	sr3n5	1	
20	SR2KM	7	sr2km	2	
21	CD8067303593000	8	cd8067303593000	0	
22	CM8068403377308	8	cm8068403377308	1	
23	BX80684I38100	8	bx80684i38100	2	
24	FH8066501715938	8	fh8066501715938	3	
25	1 day	9	1-day	0	
26	1	10	1	0	
27	2	10	2	1	
28	3	10	3	2	
29	4	10	4	3	
31	PCI Express 2.0	12	pci-express-20	0	
32	VCGGT7102XPB-BB	6	vcggt7102xpb-bb	3	
33	PNY	4	pny	1	
37	64GB	13	64gb	0	
38	16GB	13	16gb	1	
39	2933 Mbps	14	2933-mbps	0	
40	Hard Drive	5	hard-drive	3	
42	10TB	15	10tb	0	
43	GeForce RTX™ 3070	16	geforce-rtxtm-3070	0	
44	GeForce GTX TITAN X	16	geforce-gtx-titan-x	1	
45	GeForce GTX TITAN Z	16	geforce-gtx-titan-z	2	
46	GeForce RTX 3070	16	geforce-rtx-3070	3	
47	GeForce RTX 3090	16	geforce-rtx-3090	4	
48	14000 MHz	17	14000-mhz	0	
49	7Gbps	17	7gbps	1	
50	7000MHz	17	7000mhz	2	
51	14Gbps	17	14gbps	3	
52	19.5Gbps	17	195gbps	4	
53	8GB	18	8gb	0	
54	12GB	18	12gb	1	
55	24GB	18	24gb	2	
56	GDDR6	19	gddr6	0	
57	GDDR5	19	gddr5	1	
58	GDDR6X	19	gddr6x	2	
30	Triple Fan	11	triple-fan	0	
59	Single Fan	11	single-fan	1	
60	GeForce	1	geforce	3	
61	Nvidia	5	nvidia	4	
62	3090	6	3090	4	
63	3070	6	3070	5	
64	TITAN X	6	titan-x	6	
65	TITAN Z	6	titan-z	7	
66	Gigabyte	4	gigabyte	5	
3	Intel	4	intel	0	
34	Samsung	4	samsung	2	
41	Seagate	4	seagate	4	
35	Hynix	4	hynix	3	
67	Inno3D	4	inno3d	6	
68	12345	6	12345	8	
69	AB123	6	ab123	9	
72	Nvidia	20	nvidia	0	
73	3070	22	3070	0	
74	10GB	23	10gb	0	
75	Unknown	12	unknown	1	
76	test	21	test	0	
79	SHANGHAI SUPERSERVER INFORMATION	10	12790	4	
80	TCH INTERNATIONAL CO., LIMITED	10	12882	5	
81	JOINTHARVEST(HONG KONG) LIMITED	10	12089	6	
82	EX-CHANNEL GROUP LTD	10	9321	7	
83	STARTECH PACIFIC LIMITED	10	10393	8	
84	E-ENERGY LIMITED	10	12431	9	
85	YICK WAH HONG CO., LTD	10	9565	10	
86	Digital China (HK) Ltd	10	12430	11	
87	HONGKONG YOUCHENG TECHNOLOGY LIMITED	10	13749	12	
88	UHOP TECH CO., LIMITED	10	17199	13	
89	HONG KONG SUPERPHI TECHNOLOGY LIMITED	10	19053	14	
129	SHANGHAI SUPERSERVER INFORMATION	29	12790	0	
130	TCH INTERNATIONAL CO., LIMITED	29	12882	1	
131	JOINTHARVEST(HONG KONG) LIMITED	29	12089	2	
132	EX-CHANNEL GROUP LTD	29	9321	3	
133	STARTECH PACIFIC LIMITED	29	10393	4	
134	E-ENERGY LIMITED	29	12431	5	
135	YICK WAH HONG CO., LTD	29	9565	6	
136	Digital China (HK) Ltd	29	12430	7	
137	HONGKONG YOUCHENG TECHNOLOGY LIMITED	29	13749	8	
138	UHOP TECH CO., LIMITED	29	17199	9	
139	HONG KONG SUPERPHI TECHNOLOGY LIMITED	29	19053	10	
140	Active	30	active	0	
141	Inactive	30	inactive	1	
142	NVDS-2	6	nvds-2	10	
\.


--
-- Data for Name: product_attributevaluetranslation; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.product_attributevaluetranslation (id, language_code, name, attribute_value_id) FROM stdin;
\.


--
-- Data for Name: product_attributevariant; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.product_attributevariant (id, attribute_id, product_type_id, sort_order) FROM stdin;
1	9	3	0
2	10	3	1
3	10	2	0
4	10	4	0
5	10	6	0
6	10	7	0
7	10	5	0
8	10	8	0
9	10	9	0
10	10	10	0
11	10	11	0
12	10	12	0
\.


--
-- Data for Name: product_category; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.product_category (id, name, slug, description, lft, rght, tree_id, level, parent_id, background_image, seo_description, seo_title, background_image_alt, description_json, metadata, private_metadata) FROM stdin;
1	CPUs	cpus		1	14	1	0	\N					{"blocks": [{"key": "4cn7", "data": {}, "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis cursus mattis. Curabitur sem dui, vulputate fermentum imperdiet vitae, vehicula ut sapien. Duis consectetur mauris eu tristique mollis. Aenean pulvinar a nulla a tristique.", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}	{}	{}
11	CPU-Intel	cpu-intel		12	13	1	1	1					{"blocks": [{"key": "a1ghi", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}	{}	{}
12	Memory Server-DIMM	memory-server-dimm		2	3	3	1	3					{"blocks": [{"key": "a1ghi", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}	{}	{}
7	CPU Server-Intel	cpu-server-intel		4	5	1	1	1					{"blocks": [{"key": "a1ghi", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}	{}	{}
13	Memory-GDDR	memory-gddr		4	5	3	1	3					{"blocks": [{"key": "a1ghi", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}	{}	{}
8	CPU Server-AMD EPYC	cpu-server-amd-epyc		6	7	1	1	1					{"blocks": [{"key": "a1ghi", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}	{}	{}
9	CPU Desktop-Intel	cpu-desktop-intel		8	9	1	1	1					{"blocks": [{"key": "a1ghi", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}	{}	{}
10	CPU Desktop-AMD Ryzen mobile CPU	cpu-desktop-amd-ryzen-mobile-cpu		10	11	1	1	1					{"blocks": [{"key": "a1ghi", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}	{}	{}
14	Memory-DRAM	memory-dram		6	7	3	1	3					{"blocks": [{"key": "a1ghi", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}	{}	{}
3	Memory	memory		1	10	3	0	\N					{"blocks": [{"key": "4vqo2", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}	{}	{}
15	Memory PC-DIMM	memory-pc-dimm		8	9	3	1	3					{"blocks": [{"key": "a1ghi", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}	{}	{}
16	GPU Enterprise	gpu-enterprise		2	3	2	1	2					{"blocks": [{"key": "a1ghi", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}	{}	{}
2	GPUs	gpu		1	6	2	0	\N					{"blocks": [{"key": "4vqo2", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}	{}	{}
17	GPU Consumer	gpu-consumer		4	5	2	1	2					{"blocks": [{"key": "a1ghi", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}	{}	{}
4	Storage	storage		1	4	4	0	\N					{"blocks": [{"key": "4vqo2", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}	{}	{}
18	Storage Solid State Drives	storage-solid-state-drives		2	3	4	1	4					{"blocks": [{"key": "a1ghi", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}	{}	{}
\.


--
-- Data for Name: product_categorytranslation; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.product_categorytranslation (id, seo_title, seo_description, language_code, name, description, category_id, description_json) FROM stdin;
\.


--
-- Data for Name: product_collection; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.product_collection (id, name, slug, background_image, seo_description, seo_title, is_published, description, publication_date, background_image_alt, description_json, metadata, private_metadata) FROM stdin;
\.


--
-- Data for Name: product_collectionproduct; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.product_collectionproduct (id, collection_id, product_id, sort_order) FROM stdin;
\.


--
-- Data for Name: product_collectiontranslation; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.product_collectiontranslation (id, seo_title, seo_description, language_code, name, collection_id, description, description_json) FROM stdin;
\.


--
-- Data for Name: product_digitalcontent; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.product_digitalcontent (id, use_default_settings, automatic_fulfillment, content_type, content_file, max_downloads, url_valid_days, product_variant_id, metadata, private_metadata) FROM stdin;
\.


--
-- Data for Name: product_digitalcontenturl; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.product_digitalcontenturl (id, token, created, download_num, content_id, line_id) FROM stdin;
\.


--
-- Data for Name: product_product; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.product_product (id, name, description, publication_date, updated_at, product_type_id, is_published, category_id, seo_description, seo_title, charge_taxes, weight, description_json, metadata, private_metadata, minimal_variant_price_amount, currency, slug, available_for_purchase, visible_in_listings, default_variant_id) FROM stdin;
29	HMA82GR7CJR4N-WM		2021-07-23	2021-07-23 17:16:12.299475+00	6	t	3			f	\N	{}	{}	{}	\N	USD	hma82gr7cjr4n-wm	2021-07-23	t	16
9	Intel® Core™ i3-8100 Processor		2021-06-10	2021-06-22 18:17:52.452865+00	3	t	1			f	2000	{"blocks": [{"key": "qtpe", "data": {}, "text": "Boxed Intel® Core™ i3-8100 Processor (6M Cache, 3.60 GHz) FC-LGA14C", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}	{}	{}	201.000	USD	intel-coretm-i3-8100-processor-2	2021-06-10	t	9
89	Gigabyte AAAAA		2021-08-04	2021-08-04 20:36:29.840337+00	9	t	2	\N	\N	t	\N	{}	{}	{}	\N	USD	gigabyte-aaaaa	2021-08-04	t	\N
8	Intel® Xeon® Gold 6130T Processor		2021-06-10	2021-07-21 18:58:40.528318+00	2	t	1			f	4000	{"blocks": [{"key": "bcml", "data": {}, "text": "Test abcdef", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}	{}	{}	1200.460	USD	intel-xeon-gold-6130t-processor	2021-06-10	t	8
88	Gigabyte DDDD		2021-08-04	2021-08-04 20:53:55.965426+00	9	t	2	\N	\N	t	\N	{}	{}	{}	\N	USD	gigabyte-dddd	2021-08-04	t	\N
27	GeForce RTX 3090 24GB XLR8 Gaming REVEL EPIC-X RGB Triple Fan Edition		2021-07-13	2021-07-23 17:36:58.542473+00	5	t	2			f	\N	{"blocks": [{"key": "65r9v", "data": {}, "text": "VCG309024TFXPPB PNY GeForce RTX 3090 24GB XLR8 Gaming REVEL EPIC-X RGB Triple Fan Edition", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}	{}	{}	\N	USD	geforce-gt-710-2gb-pci-express-20-graphics-card	2021-07-13	t	12
28	M386A8K40CM2-CVF		2021-07-23	2021-07-23 17:03:36.664804+00	6	t	3			f	\N	{"blocks": [{"key": "asqr8", "data": {}, "text": "64GB DDR4 R-DIMM 2933MHz", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}	{}	{}	\N	USD	m386a8k40cm2-cvf	2021-07-23	t	13
32	Gigabyte GeForce GTX TITAN X		2021-07-23	2021-07-23 17:47:43.366424+00	8	t	2			f	\N	{"blocks": [{"key": "fpk3e", "data": {}, "text": "Gigabyte GeForce GTX TITANX 12GB", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}	{}	{}	\N	USD	gigabyte-geforce-gtx-titan-x	2021-07-23	t	20
30	ST10000NM0016		2021-07-23	2021-07-23 17:15:24.885875+00	7	t	4			f	\N	{"blocks": [{"key": "5kaq2", "data": {}, "text": "Enterprise Capacity 3.5HDD (Helium)", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}	{}	{}	\N	USD	st10000nm0016	2021-07-23	t	14
31	Gigabyte GeForce RTX™ 3070 Gaming OC 8G		2021-07-23	2021-07-23 17:44:56.466771+00	5	t	2			f	\N	{"blocks": [{"key": "1r1r3", "data": {}, "text": "Gigabyte GeForce RTX™ 3070 Gaming OC 8G ", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}	{}	{}	\N	USD	gigabyte-geforce-rtxtm-3070-gaming-oc-8g	2021-07-23	t	19
7	Intel® Celeron® Processor N3010		2021-06-10	2021-08-12 15:35:02.045658+00	4	t	1			f	\N	{"blocks": [{"key": "5fokg", "data": {}, "text": "Intel® Celeron® Processor N3010 (2M Cache, up to 2.24 GHz) FC-BGA15F, Tray", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}	{"mpn": "SR2KM", "mcode": "Intel", "item_num_id": "43786", "market_insight": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc enim magna, vehicula nec augue ut, eleifend sagittis velit. Phasellus pulvinar ultrices tellus, ut varius nisi aliquam et. Praesent eu nibh nunc. Nullam posuere commodo blandit. Phasellus eu justo ligula. Cras leo ex, sagittis vitae mauris eget, luctus sodales ex. Maecenas venenatis vitae sem ut finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam ac quam nec magna porta vestibulum. Pellentesque rutrum sapien in nibh tincidunt, at gravida urna feugiat."}	{}	105.000	USD	intel-celeron-processor-n3010	2021-06-10	t	7
116	Intel hfglmn		\N	2021-08-09 18:05:05.433759+00	12	t	11	\N	\N	t	\N	{}	{}	{}	\N	USD	intel-hfglmn	\N	t	\N
117	Intel YNFP		\N	2021-08-09 20:17:30.04629+00	12	t	11	\N	\N	t	\N	{}	{}	{}	\N	USD	intel-ynfp	\N	t	\N
118	Intel HGFS		2021-08-12	2021-08-12 15:10:45.810936+00	12	t	11	\N	\N	t	\N	{}	{}	{"mpn": "HGFS", "mcode": "Intel", "status": "ACTIVE", "item_num_id": 190709}	\N	USD	intel-hgfs	\N	t	\N
6	Intel® Core™ i3-8100 Processor		2021-06-10	2021-08-12 15:33:13.280937+00	3	t	1			f	1000	{"blocks": [{"key": "1ofom", "data": {}, "text": "Intel® Core™ i3-8100 Processor (6M Cache, 3.60 GHz) FC-LGA14C, Tray", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}	{"mpn": "SR3N5", "mcode": "Intel", "item_num_id": "8679"}	{}	200.590	USD	intel-coretm-i3-8100-processor	2021-06-10	t	6
\.


--
-- Data for Name: product_productimage; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.product_productimage (id, image, ppoi, alt, sort_order, product_id) FROM stdin;
\.


--
-- Data for Name: product_producttranslation; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.product_producttranslation (id, seo_title, seo_description, language_code, name, description, product_id, description_json) FROM stdin;
\.


--
-- Data for Name: product_producttype; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.product_producttype (id, name, has_variants, is_shipping_required, weight, is_digital, metadata, private_metadata, slug) FROM stdin;
2	Gold	t	t	0	f	{}	{}	gold
4	Intel® Celeron® Processor N Series	t	t	0	f	{}	{}	intel-celeron-processor-n-series
6	Memory Module	t	f	0	f	{}	{}	memory-module
7	Storage Hard Drive	t	f	0	f	{}	{}	storage-hard-drive
5	RTX	t	t	0	f	{}	{}	nvidia-geforce-gt-710
8	GTX	t	t	0	f	{}	{}	gtx
9	GPU	t	t	0	f	{}	{}	gpu
10	Memory	t	t	0	f	{}	{}	memory
11	Storage	t	t	0	f	{}	{}	storage
3	8th Generation Intel® Core™ i3 Processors	t	t	0	f	{}	{}	8th-generation-intel-coretm-i3-processors
12	CPU	t	t	0	f	{}	{}	cpu
\.


--
-- Data for Name: product_productvariant; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.product_productvariant (id, sku, name, product_id, cost_price_amount, track_inventory, weight, metadata, private_metadata, currency, price_amount, sort_order) FROM stdin;
46	654321		89	\N	t	\N	{}	{}	USD	59.990	2
47	654322		89	\N	t	\N	{}	{}	USD	59.990	3
48	654323		89	\N	t	\N	{}	{}	USD	59.990	4
49	654324		89	\N	t	\N	{}	{}	USD	59.990	5
50	654325		89	\N	t	\N	{}	{}	USD	59.990	6
51	654326		89	\N	t	\N	{}	{}	USD	59.990	7
54	654327		116	\N	t	\N	{}	{}	USD	59.990	0
55	654329		116	\N	t	\N	{}	{}	USD	79.990	1
6	1234	1 day / 1	6	100.000	t	\N	{}	{}	USD	200.590	0
10	8765	1 day / 2	6	1.000	t	\N	{}	{}	USD	3.000	1
8	123456	1	8	\N	t	\N	{}	{}	USD	1200.460	0
7	12345	4	7	\N	t	\N	{}	{}	USD	105.000	0
13	65784	1	28	\N	t	\N	{}	{}	USD	62.560	0
14	123123	3	30	\N	t	\N	{}	{}	USD	39.990	0
15	978987	2	30	\N	t	\N	{}	{}	USD	36.000	1
16	345345	1	29	\N	t	\N	{}	{}	USD	41.000	0
17	543543	2	29	\N	t	\N	{}	{}	USD	45.000	1
9	9876		9	\N	f	\N	{}	{}	USD	201.000	0
18	432432	4	27	\N	t	\N	{}	{}	USD	48.000	1
12	246	1	27	\N	f	\N	{}	{}	USD	79.990	0
19	123412323	2	31	\N	t	\N	{}	{}	USD	114.990	0
20	4532634	1	32	\N	t	\N	{}	{}	USD	255.250	0
21	777789		88	\N	t	\N	{}	{}	USD	999.990	0
23	777765		89	\N	t	\N	{}	{}	USD	999.990	0
24	777766		89	\N	t	\N	{}	{}	USD	49.990	1
\.


--
-- Data for Name: product_productvarianttranslation; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.product_productvarianttranslation (id, language_code, name, product_variant_id) FROM stdin;
\.


--
-- Data for Name: product_variantimage; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.product_variantimage (id, image_id, variant_id) FROM stdin;
\.


--
-- Data for Name: rest_framework_api_key_apikey; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.rest_framework_api_key_apikey (id, created, name, revoked, expiry_date, hashed_key, prefix) FROM stdin;
T9mKULO0.pbkdf2_sha256$216000$kjKAdscmpsCq$+eZ9AbN6sjACGlmQAJV+2Y+Ls3w14yOAtN9eNugX/cg=	2021-07-01 14:38:43.964988+00	rms-service	f	\N	pbkdf2_sha256$216000$kjKAdscmpsCq$+eZ9AbN6sjACGlmQAJV+2Y+Ls3w14yOAtN9eNugX/cg=	T9mKULO0
YLXS5t5O.pbkdf2_sha256$216000$OiHsZmvAb4Sj$5aB8CQBwOQfqr6vKh91l/glwWelEe4lLk9hCfanijPQ=	2021-07-23 19:27:01.582278+00	rms-service	f	\N	pbkdf2_sha256$216000$OiHsZmvAb4Sj$5aB8CQBwOQfqr6vKh91l/glwWelEe4lLk9hCfanijPQ=	YLXS5t5O
\.


--
-- Data for Name: shipping_shippingmethod; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.shipping_shippingmethod (id, name, maximum_order_price_amount, maximum_order_weight, minimum_order_price_amount, minimum_order_weight, price_amount, type, shipping_zone_id, currency) FROM stdin;
1	Standard Shipping	\N	\N	0.000	\N	5.000	price	1	USD
\.


--
-- Data for Name: shipping_shippingmethodtranslation; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.shipping_shippingmethodtranslation (id, language_code, name, shipping_method_id) FROM stdin;
\.


--
-- Data for Name: shipping_shippingzone; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.shipping_shippingzone (id, name, countries, "default") FROM stdin;
1	United States	US	f
\.


--
-- Data for Name: site_authorizationkey; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.site_authorizationkey (id, name, key, password, site_settings_id) FROM stdin;
\.


--
-- Data for Name: site_sitesettings; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.site_sitesettings (id, header_text, description, site_id, bottom_menu_id, top_menu_id, display_gross_prices, include_taxes_in_prices, charge_taxes_on_shipping, track_inventory_by_default, homepage_collection_id, default_weight_unit, automatic_fulfillment_digital_products, default_digital_max_downloads, default_digital_url_valid_days, company_address_id, default_mail_sender_address, default_mail_sender_name, customer_set_password_url) FROM stdin;
1	Test Saleor - a sample shop!		1	2	1	t	t	t	t	\N	kg	f	\N	\N	22	\N		\N
\.


--
-- Data for Name: site_sitesettingstranslation; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.site_sitesettingstranslation (id, language_code, header_text, description, site_settings_id) FROM stdin;
\.


--
-- Data for Name: warehouse_allocation; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.warehouse_allocation (id, quantity_allocated, order_line_id, stock_id) FROM stdin;
1	2	8	5
2	2	9	11
\.


--
-- Data for Name: warehouse_stock; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.warehouse_stock (id, quantity, product_variant_id, warehouse_id) FROM stdin;
2	20	10	f4a76bcd-c628-48d5-a24d-c5b37c1e6078
5	10	7	f4a76bcd-c628-48d5-a24d-c5b37c1e6078
4	38	8	f4a76bcd-c628-48d5-a24d-c5b37c1e6078
1	24	6	f4a76bcd-c628-48d5-a24d-c5b37c1e6078
6	11	13	f4a76bcd-c628-48d5-a24d-c5b37c1e6078
7	30	14	f4a76bcd-c628-48d5-a24d-c5b37c1e6078
8	2	15	f4a76bcd-c628-48d5-a24d-c5b37c1e6078
9	15	16	f4a76bcd-c628-48d5-a24d-c5b37c1e6078
10	1	17	f4a76bcd-c628-48d5-a24d-c5b37c1e6078
11	6	18	f4a76bcd-c628-48d5-a24d-c5b37c1e6078
3	2	12	f4a76bcd-c628-48d5-a24d-c5b37c1e6078
12	5000	19	f4a76bcd-c628-48d5-a24d-c5b37c1e6078
13	1500	20	f4a76bcd-c628-48d5-a24d-c5b37c1e6078
14	1000	46	f4a76bcd-c628-48d5-a24d-c5b37c1e6078
15	1000	47	f4a76bcd-c628-48d5-a24d-c5b37c1e6078
16	1000	48	f4a76bcd-c628-48d5-a24d-c5b37c1e6078
17	1000	49	f4a76bcd-c628-48d5-a24d-c5b37c1e6078
18	1000	50	f4a76bcd-c628-48d5-a24d-c5b37c1e6078
19	1000	51	f4a76bcd-c628-48d5-a24d-c5b37c1e6078
21	1000	54	f4a76bcd-c628-48d5-a24d-c5b37c1e6078
22	99	55	f4a76bcd-c628-48d5-a24d-c5b37c1e6078
\.


--
-- Data for Name: warehouse_warehouse; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.warehouse_warehouse (id, name, company_name, email, address_id, slug) FROM stdin;
f4a76bcd-c628-48d5-a24d-c5b37c1e6078	Test Warehouse	Testing		11	test-warehouse
\.


--
-- Data for Name: warehouse_warehouse_shipping_zones; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.warehouse_warehouse_shipping_zones (id, warehouse_id, shippingzone_id) FROM stdin;
1	f4a76bcd-c628-48d5-a24d-c5b37c1e6078	1
\.


--
-- Data for Name: webhook_webhook; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.webhook_webhook (id, target_url, is_active, secret_key, app_id, name) FROM stdin;
\.


--
-- Data for Name: webhook_webhookevent; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.webhook_webhookevent (id, event_type, webhook_id) FROM stdin;
\.


--
-- Data for Name: wishlist_wishlist; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.wishlist_wishlist (id, created_at, token, user_id) FROM stdin;
\.


--
-- Data for Name: wishlist_wishlistitem; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.wishlist_wishlistitem (id, created_at, product_id, wishlist_id) FROM stdin;
\.


--
-- Data for Name: wishlist_wishlistitem_variants; Type: TABLE DATA; Schema: public; Owner: saleor
--

COPY public.wishlist_wishlistitem_variants (id, wishlistitem_id, productvariant_id) FROM stdin;
\.


--
-- Name: account_customerevent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.account_customerevent_id_seq', 28, true);


--
-- Name: account_customernote_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.account_customernote_id_seq', 1, false);


--
-- Name: account_serviceaccount_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.account_serviceaccount_id_seq', 1, false);


--
-- Name: account_serviceaccount_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.account_serviceaccount_permissions_id_seq', 1, false);


--
-- Name: account_serviceaccounttoken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.account_serviceaccounttoken_id_seq', 1, false);


--
-- Name: account_staffnotificationrecipient_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.account_staffnotificationrecipient_id_seq', 1, false);


--
-- Name: app_appinstallation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.app_appinstallation_id_seq', 1, false);


--
-- Name: app_appinstallation_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.app_appinstallation_permissions_id_seq', 1, false);


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 2, true);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 19, true);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 327, true);


--
-- Name: cart_cartline_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.cart_cartline_id_seq', 9, true);


--
-- Name: checkout_checkout_gift_cards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.checkout_checkout_gift_cards_id_seq', 1, false);


--
-- Name: csv_exportevent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.csv_exportevent_id_seq', 1, false);


--
-- Name: csv_exportfile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.csv_exportfile_id_seq', 1, false);


--
-- Name: discount_sale_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.discount_sale_categories_id_seq', 1, false);


--
-- Name: discount_sale_collections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.discount_sale_collections_id_seq', 1, false);


--
-- Name: discount_sale_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.discount_sale_id_seq', 1, false);


--
-- Name: discount_sale_products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.discount_sale_products_id_seq', 1, false);


--
-- Name: discount_saletranslation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.discount_saletranslation_id_seq', 1, false);


--
-- Name: discount_voucher_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.discount_voucher_categories_id_seq', 1, false);


--
-- Name: discount_voucher_collections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.discount_voucher_collections_id_seq', 1, false);


--
-- Name: discount_voucher_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.discount_voucher_id_seq', 1, false);


--
-- Name: discount_voucher_products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.discount_voucher_products_id_seq', 1, false);


--
-- Name: discount_vouchercustomer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.discount_vouchercustomer_id_seq', 1, false);


--
-- Name: discount_vouchertranslation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.discount_vouchertranslation_id_seq', 1, false);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 78, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 552, true);


--
-- Name: django_prices_openexchangerates_conversionrate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.django_prices_openexchangerates_conversionrate_id_seq', 1, false);


--
-- Name: django_prices_vatlayer_ratetypes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.django_prices_vatlayer_ratetypes_id_seq', 1, false);


--
-- Name: django_prices_vatlayer_vat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.django_prices_vatlayer_vat_id_seq', 1, false);


--
-- Name: django_site_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.django_site_id_seq', 1, true);


--
-- Name: fusion_online_offer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.fusion_online_offer_id_seq', 11, true);


--
-- Name: fusion_online_rfqlineitem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.fusion_online_rfqlineitem_id_seq', 3, true);


--
-- Name: fusion_online_rfqresponse_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.fusion_online_rfqresponse_id_seq', 2, true);


--
-- Name: fusion_online_rfqsubmission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.fusion_online_rfqsubmission_id_seq', 3, true);


--
-- Name: fusion_online_shippingaddress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.fusion_online_shippingaddress_id_seq', 37, true);


--
-- Name: giftcard_giftcard_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.giftcard_giftcard_id_seq', 1, false);


--
-- Name: invoice_invoice_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.invoice_invoice_id_seq', 1, true);


--
-- Name: invoice_invoiceevent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.invoice_invoiceevent_id_seq', 1, true);


--
-- Name: menu_menu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.menu_menu_id_seq', 2, true);


--
-- Name: menu_menuitem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.menu_menuitem_id_seq', 1, true);


--
-- Name: menu_menuitemtranslation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.menu_menuitemtranslation_id_seq', 1, false);


--
-- Name: order_fulfillment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.order_fulfillment_id_seq', 1, true);


--
-- Name: order_fulfillmentline_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.order_fulfillmentline_id_seq', 2, true);


--
-- Name: order_order_gift_cards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.order_order_gift_cards_id_seq', 1, false);


--
-- Name: order_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.order_order_id_seq', 7, true);


--
-- Name: order_ordereditem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.order_ordereditem_id_seq', 9, true);


--
-- Name: order_orderevent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.order_orderevent_id_seq', 36, true);


--
-- Name: page_page_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.page_page_id_seq', 1, false);


--
-- Name: page_pagetranslation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.page_pagetranslation_id_seq', 1, false);


--
-- Name: payment_paymentmethod_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.payment_paymentmethod_id_seq', 7, true);


--
-- Name: payment_transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.payment_transaction_id_seq', 7, true);


--
-- Name: plugins_pluginconfiguration_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.plugins_pluginconfiguration_id_seq', 1, true);


--
-- Name: product_assignedproductattribute_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.product_assignedproductattribute_id_seq', 337, true);


--
-- Name: product_assignedproductattribute_values_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.product_assignedproductattribute_values_id_seq', 459, true);


--
-- Name: product_assignedvariantattribute_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.product_assignedvariantattribute_id_seq', 48, true);


--
-- Name: product_assignedvariantattribute_values_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.product_assignedvariantattribute_values_id_seq', 48, true);


--
-- Name: product_attributechoicevalue_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.product_attributechoicevalue_id_seq', 145, true);


--
-- Name: product_attributechoicevaluetranslation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.product_attributechoicevaluetranslation_id_seq', 1, false);


--
-- Name: product_attributeproduct_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.product_attributeproduct_id_seq', 88, true);


--
-- Name: product_attributevariant_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.product_attributevariant_id_seq', 12, true);


--
-- Name: product_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.product_category_id_seq', 18, true);


--
-- Name: product_categorytranslation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.product_categorytranslation_id_seq', 1, false);


--
-- Name: product_collection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.product_collection_id_seq', 1, false);


--
-- Name: product_collection_products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.product_collection_products_id_seq', 1, false);


--
-- Name: product_collectiontranslation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.product_collectiontranslation_id_seq', 1, false);


--
-- Name: product_digitalcontent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.product_digitalcontent_id_seq', 1, false);


--
-- Name: product_digitalcontenturl_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.product_digitalcontenturl_id_seq', 1, false);


--
-- Name: product_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.product_product_id_seq', 118, true);


--
-- Name: product_productattribute_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.product_productattribute_id_seq', 30, true);


--
-- Name: product_productattributetranslation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.product_productattributetranslation_id_seq', 1, false);


--
-- Name: product_productclass_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.product_productclass_id_seq', 12, true);


--
-- Name: product_productimage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.product_productimage_id_seq', 1, false);


--
-- Name: product_producttranslation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.product_producttranslation_id_seq', 1, false);


--
-- Name: product_productvariant_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.product_productvariant_id_seq', 55, true);


--
-- Name: product_productvarianttranslation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.product_productvarianttranslation_id_seq', 1, false);


--
-- Name: product_variantimage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.product_variantimage_id_seq', 1, false);


--
-- Name: shipping_shippingmethod_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.shipping_shippingmethod_id_seq', 1, true);


--
-- Name: shipping_shippingmethodtranslation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.shipping_shippingmethodtranslation_id_seq', 1, false);


--
-- Name: shipping_shippingzone_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.shipping_shippingzone_id_seq', 1, true);


--
-- Name: site_authorizationkey_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.site_authorizationkey_id_seq', 1, false);


--
-- Name: site_sitesettings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.site_sitesettings_id_seq', 1, true);


--
-- Name: site_sitesettingstranslation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.site_sitesettingstranslation_id_seq', 1, false);


--
-- Name: userprofile_address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.userprofile_address_id_seq', 66, true);


--
-- Name: userprofile_user_addresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.userprofile_user_addresses_id_seq', 3, true);


--
-- Name: userprofile_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.userprofile_user_groups_id_seq', 5, true);


--
-- Name: userprofile_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.userprofile_user_id_seq', 13, true);


--
-- Name: userprofile_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.userprofile_user_user_permissions_id_seq', 1, false);


--
-- Name: warehouse_allocation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.warehouse_allocation_id_seq', 2, true);


--
-- Name: warehouse_stock_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.warehouse_stock_id_seq', 22, true);


--
-- Name: warehouse_warehouse_shipping_zones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.warehouse_warehouse_shipping_zones_id_seq', 1, true);


--
-- Name: webhook_webhook_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.webhook_webhook_id_seq', 1, false);


--
-- Name: webhook_webhookevent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.webhook_webhookevent_id_seq', 1, false);


--
-- Name: wishlist_wishlist_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.wishlist_wishlist_id_seq', 1, false);


--
-- Name: wishlist_wishlistitem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.wishlist_wishlistitem_id_seq', 1, false);


--
-- Name: wishlist_wishlistitem_variants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saleor
--

SELECT pg_catalog.setval('public.wishlist_wishlistitem_variants_id_seq', 1, false);


--
-- Name: account_customerevent account_customerevent_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_customerevent
    ADD CONSTRAINT account_customerevent_pkey PRIMARY KEY (id);


--
-- Name: account_customernote account_customernote_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_customernote
    ADD CONSTRAINT account_customernote_pkey PRIMARY KEY (id);


--
-- Name: app_app_permissions account_serviceaccount_p_serviceaccount_id_permis_1686b2ab_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.app_app_permissions
    ADD CONSTRAINT account_serviceaccount_p_serviceaccount_id_permis_1686b2ab_uniq UNIQUE (app_id, permission_id);


--
-- Name: app_app_permissions account_serviceaccount_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.app_app_permissions
    ADD CONSTRAINT account_serviceaccount_permissions_pkey PRIMARY KEY (id);


--
-- Name: app_app account_serviceaccount_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.app_app
    ADD CONSTRAINT account_serviceaccount_pkey PRIMARY KEY (id);


--
-- Name: app_apptoken account_serviceaccounttoken_auth_token_key; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.app_apptoken
    ADD CONSTRAINT account_serviceaccounttoken_auth_token_key UNIQUE (auth_token);


--
-- Name: app_apptoken account_serviceaccounttoken_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.app_apptoken
    ADD CONSTRAINT account_serviceaccounttoken_pkey PRIMARY KEY (id);


--
-- Name: account_staffnotificationrecipient account_staffnotificationrecipient_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_staffnotificationrecipient
    ADD CONSTRAINT account_staffnotificationrecipient_pkey PRIMARY KEY (id);


--
-- Name: account_staffnotificationrecipient account_staffnotificationrecipient_staff_email_key; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_staffnotificationrecipient
    ADD CONSTRAINT account_staffnotificationrecipient_staff_email_key UNIQUE (staff_email);


--
-- Name: account_staffnotificationrecipient account_staffnotificationrecipient_user_id_key; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_staffnotificationrecipient
    ADD CONSTRAINT account_staffnotificationrecipient_user_id_key UNIQUE (user_id);


--
-- Name: app_appinstallation_permissions app_appinstallation_perm_appinstallation_id_permi_7b7e0448_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.app_appinstallation_permissions
    ADD CONSTRAINT app_appinstallation_perm_appinstallation_id_permi_7b7e0448_uniq UNIQUE (appinstallation_id, permission_id);


--
-- Name: app_appinstallation_permissions app_appinstallation_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.app_appinstallation_permissions
    ADD CONSTRAINT app_appinstallation_permissions_pkey PRIMARY KEY (id);


--
-- Name: app_appinstallation app_appinstallation_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.app_appinstallation
    ADD CONSTRAINT app_appinstallation_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: checkout_checkout cart_cart_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.checkout_checkout
    ADD CONSTRAINT cart_cart_pkey PRIMARY KEY (token);


--
-- Name: checkout_checkoutline cart_cartline_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.checkout_checkoutline
    ADD CONSTRAINT cart_cartline_pkey PRIMARY KEY (id);


--
-- Name: checkout_checkoutline checkout_cartline_cart_id_variant_id_data_new_de3d8fca_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.checkout_checkoutline
    ADD CONSTRAINT checkout_cartline_cart_id_variant_id_data_new_de3d8fca_uniq UNIQUE (checkout_id, variant_id, data);


--
-- Name: checkout_checkout_gift_cards checkout_checkout_gift_c_checkout_id_giftcard_id_401ba79e_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.checkout_checkout_gift_cards
    ADD CONSTRAINT checkout_checkout_gift_c_checkout_id_giftcard_id_401ba79e_uniq UNIQUE (checkout_id, giftcard_id);


--
-- Name: checkout_checkout_gift_cards checkout_checkout_gift_cards_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.checkout_checkout_gift_cards
    ADD CONSTRAINT checkout_checkout_gift_cards_pkey PRIMARY KEY (id);


--
-- Name: csv_exportevent csv_exportevent_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.csv_exportevent
    ADD CONSTRAINT csv_exportevent_pkey PRIMARY KEY (id);


--
-- Name: csv_exportfile csv_exportfile_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.csv_exportfile
    ADD CONSTRAINT csv_exportfile_pkey PRIMARY KEY (id);


--
-- Name: discount_sale_categories discount_sale_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_sale_categories
    ADD CONSTRAINT discount_sale_categories_pkey PRIMARY KEY (id);


--
-- Name: discount_sale_categories discount_sale_categories_sale_id_category_id_be438401_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_sale_categories
    ADD CONSTRAINT discount_sale_categories_sale_id_category_id_be438401_uniq UNIQUE (sale_id, category_id);


--
-- Name: discount_sale_collections discount_sale_collections_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_sale_collections
    ADD CONSTRAINT discount_sale_collections_pkey PRIMARY KEY (id);


--
-- Name: discount_sale_collections discount_sale_collections_sale_id_collection_id_01b57fc3_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_sale_collections
    ADD CONSTRAINT discount_sale_collections_sale_id_collection_id_01b57fc3_uniq UNIQUE (sale_id, collection_id);


--
-- Name: discount_sale discount_sale_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_sale
    ADD CONSTRAINT discount_sale_pkey PRIMARY KEY (id);


--
-- Name: discount_sale_products discount_sale_products_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_sale_products
    ADD CONSTRAINT discount_sale_products_pkey PRIMARY KEY (id);


--
-- Name: discount_sale_products discount_sale_products_sale_id_product_id_1c2df1f8_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_sale_products
    ADD CONSTRAINT discount_sale_products_sale_id_product_id_1c2df1f8_uniq UNIQUE (sale_id, product_id);


--
-- Name: discount_saletranslation discount_saletranslation_language_code_sale_id_e956163f_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_saletranslation
    ADD CONSTRAINT discount_saletranslation_language_code_sale_id_e956163f_uniq UNIQUE (language_code, sale_id);


--
-- Name: discount_saletranslation discount_saletranslation_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_saletranslation
    ADD CONSTRAINT discount_saletranslation_pkey PRIMARY KEY (id);


--
-- Name: discount_voucher_categories discount_voucher_categor_voucher_id_category_id_bb5f8954_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_voucher_categories
    ADD CONSTRAINT discount_voucher_categor_voucher_id_category_id_bb5f8954_uniq UNIQUE (voucher_id, category_id);


--
-- Name: discount_voucher_categories discount_voucher_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_voucher_categories
    ADD CONSTRAINT discount_voucher_categories_pkey PRIMARY KEY (id);


--
-- Name: discount_voucher discount_voucher_code_key; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_voucher
    ADD CONSTRAINT discount_voucher_code_key UNIQUE (code);


--
-- Name: discount_voucher_collections discount_voucher_collect_voucher_id_collection_id_736b8f24_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_voucher_collections
    ADD CONSTRAINT discount_voucher_collect_voucher_id_collection_id_736b8f24_uniq UNIQUE (voucher_id, collection_id);


--
-- Name: discount_voucher_collections discount_voucher_collections_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_voucher_collections
    ADD CONSTRAINT discount_voucher_collections_pkey PRIMARY KEY (id);


--
-- Name: discount_voucher discount_voucher_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_voucher
    ADD CONSTRAINT discount_voucher_pkey PRIMARY KEY (id);


--
-- Name: discount_voucher_products discount_voucher_products_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_voucher_products
    ADD CONSTRAINT discount_voucher_products_pkey PRIMARY KEY (id);


--
-- Name: discount_voucher_products discount_voucher_products_voucher_id_product_id_2b092ec4_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_voucher_products
    ADD CONSTRAINT discount_voucher_products_voucher_id_product_id_2b092ec4_uniq UNIQUE (voucher_id, product_id);


--
-- Name: discount_vouchercustomer discount_vouchercustomer_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_vouchercustomer
    ADD CONSTRAINT discount_vouchercustomer_pkey PRIMARY KEY (id);


--
-- Name: discount_vouchercustomer discount_vouchercustomer_voucher_id_customer_emai_b7b1d6a1_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_vouchercustomer
    ADD CONSTRAINT discount_vouchercustomer_voucher_id_customer_emai_b7b1d6a1_uniq UNIQUE (voucher_id, customer_email);


--
-- Name: discount_vouchertranslation discount_vouchertranslat_language_code_voucher_id_af4428b5_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_vouchertranslation
    ADD CONSTRAINT discount_vouchertranslat_language_code_voucher_id_af4428b5_uniq UNIQUE (language_code, voucher_id);


--
-- Name: discount_vouchertranslation discount_vouchertranslation_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_vouchertranslation
    ADD CONSTRAINT discount_vouchertranslation_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_prices_openexchangerates_conversionrate django_prices_openexchangerates_conversionrate_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.django_prices_openexchangerates_conversionrate
    ADD CONSTRAINT django_prices_openexchangerates_conversionrate_pkey PRIMARY KEY (id);


--
-- Name: django_prices_openexchangerates_conversionrate django_prices_openexchangerates_conversionrate_to_currency_key; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.django_prices_openexchangerates_conversionrate
    ADD CONSTRAINT django_prices_openexchangerates_conversionrate_to_currency_key UNIQUE (to_currency);


--
-- Name: django_prices_vatlayer_ratetypes django_prices_vatlayer_ratetypes_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.django_prices_vatlayer_ratetypes
    ADD CONSTRAINT django_prices_vatlayer_ratetypes_pkey PRIMARY KEY (id);


--
-- Name: django_prices_vatlayer_vat django_prices_vatlayer_vat_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.django_prices_vatlayer_vat
    ADD CONSTRAINT django_prices_vatlayer_vat_pkey PRIMARY KEY (id);


--
-- Name: django_site django_site_domain_a2e37b91_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.django_site
    ADD CONSTRAINT django_site_domain_a2e37b91_uniq UNIQUE (domain);


--
-- Name: django_site django_site_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.django_site
    ADD CONSTRAINT django_site_pkey PRIMARY KEY (id);


--
-- Name: fusion_online_offer fusion_online_offer_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.fusion_online_offer
    ADD CONSTRAINT fusion_online_offer_pkey PRIMARY KEY (id);


--
-- Name: fusion_online_offer fusion_online_offer_product_variant_id_key; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.fusion_online_offer
    ADD CONSTRAINT fusion_online_offer_product_variant_id_key UNIQUE (product_variant_id);


--
-- Name: fusion_online_rfqlineitem fusion_online_rfqlineitem_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.fusion_online_rfqlineitem
    ADD CONSTRAINT fusion_online_rfqlineitem_pkey PRIMARY KEY (id);


--
-- Name: fusion_online_rfqresponse fusion_online_rfqresponse_line_item_id_key; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.fusion_online_rfqresponse
    ADD CONSTRAINT fusion_online_rfqresponse_line_item_id_key UNIQUE (line_item_id);


--
-- Name: fusion_online_rfqresponse fusion_online_rfqresponse_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.fusion_online_rfqresponse
    ADD CONSTRAINT fusion_online_rfqresponse_pkey PRIMARY KEY (id);


--
-- Name: fusion_online_rfqsubmission fusion_online_rfqsubmission_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.fusion_online_rfqsubmission
    ADD CONSTRAINT fusion_online_rfqsubmission_pkey PRIMARY KEY (id);


--
-- Name: fusion_online_shippingaddress fusion_online_shippingaddress_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.fusion_online_shippingaddress
    ADD CONSTRAINT fusion_online_shippingaddress_pkey PRIMARY KEY (id);


--
-- Name: giftcard_giftcard giftcard_giftcard_code_key; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.giftcard_giftcard
    ADD CONSTRAINT giftcard_giftcard_code_key UNIQUE (code);


--
-- Name: giftcard_giftcard giftcard_giftcard_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.giftcard_giftcard
    ADD CONSTRAINT giftcard_giftcard_pkey PRIMARY KEY (id);


--
-- Name: invoice_invoice invoice_invoice_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.invoice_invoice
    ADD CONSTRAINT invoice_invoice_pkey PRIMARY KEY (id);


--
-- Name: invoice_invoiceevent invoice_invoiceevent_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.invoice_invoiceevent
    ADD CONSTRAINT invoice_invoiceevent_pkey PRIMARY KEY (id);


--
-- Name: menu_menu menu_menu_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.menu_menu
    ADD CONSTRAINT menu_menu_pkey PRIMARY KEY (id);


--
-- Name: menu_menu menu_menu_slug_key; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.menu_menu
    ADD CONSTRAINT menu_menu_slug_key UNIQUE (slug);


--
-- Name: menu_menuitem menu_menuitem_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.menu_menuitem
    ADD CONSTRAINT menu_menuitem_pkey PRIMARY KEY (id);


--
-- Name: menu_menuitemtranslation menu_menuitemtranslation_language_code_menu_item__508dcdd8_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.menu_menuitemtranslation
    ADD CONSTRAINT menu_menuitemtranslation_language_code_menu_item__508dcdd8_uniq UNIQUE (language_code, menu_item_id);


--
-- Name: menu_menuitemtranslation menu_menuitemtranslation_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.menu_menuitemtranslation
    ADD CONSTRAINT menu_menuitemtranslation_pkey PRIMARY KEY (id);


--
-- Name: order_fulfillment order_fulfillment_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.order_fulfillment
    ADD CONSTRAINT order_fulfillment_pkey PRIMARY KEY (id);


--
-- Name: order_fulfillmentline order_fulfillmentline_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.order_fulfillmentline
    ADD CONSTRAINT order_fulfillmentline_pkey PRIMARY KEY (id);


--
-- Name: order_order_gift_cards order_order_gift_cards_order_id_giftcard_id_f58e7356_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.order_order_gift_cards
    ADD CONSTRAINT order_order_gift_cards_order_id_giftcard_id_f58e7356_uniq UNIQUE (order_id, giftcard_id);


--
-- Name: order_order_gift_cards order_order_gift_cards_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.order_order_gift_cards
    ADD CONSTRAINT order_order_gift_cards_pkey PRIMARY KEY (id);


--
-- Name: order_order order_order_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.order_order
    ADD CONSTRAINT order_order_pkey PRIMARY KEY (id);


--
-- Name: order_order order_order_token_key; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.order_order
    ADD CONSTRAINT order_order_token_key UNIQUE (token);


--
-- Name: order_orderline order_ordereditem_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.order_orderline
    ADD CONSTRAINT order_ordereditem_pkey PRIMARY KEY (id);


--
-- Name: order_orderevent order_orderevent_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.order_orderevent
    ADD CONSTRAINT order_orderevent_pkey PRIMARY KEY (id);


--
-- Name: page_page page_page_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.page_page
    ADD CONSTRAINT page_page_pkey PRIMARY KEY (id);


--
-- Name: page_page page_page_slug_key; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.page_page
    ADD CONSTRAINT page_page_slug_key UNIQUE (slug);


--
-- Name: page_pagetranslation page_pagetranslation_language_code_page_id_35685962_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.page_pagetranslation
    ADD CONSTRAINT page_pagetranslation_language_code_page_id_35685962_uniq UNIQUE (language_code, page_id);


--
-- Name: page_pagetranslation page_pagetranslation_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.page_pagetranslation
    ADD CONSTRAINT page_pagetranslation_pkey PRIMARY KEY (id);


--
-- Name: payment_payment payment_paymentmethod_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.payment_payment
    ADD CONSTRAINT payment_paymentmethod_pkey PRIMARY KEY (id);


--
-- Name: payment_transaction payment_transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.payment_transaction
    ADD CONSTRAINT payment_transaction_pkey PRIMARY KEY (id);


--
-- Name: plugins_pluginconfiguration plugins_pluginconfiguration_identifier_3d7349fe_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.plugins_pluginconfiguration
    ADD CONSTRAINT plugins_pluginconfiguration_identifier_3d7349fe_uniq UNIQUE (identifier);


--
-- Name: plugins_pluginconfiguration plugins_pluginconfiguration_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.plugins_pluginconfiguration
    ADD CONSTRAINT plugins_pluginconfiguration_pkey PRIMARY KEY (id);


--
-- Name: product_assignedproductattribute_values product_assignedproducta_assignedproductattribute_ee1fc0ab_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_assignedproductattribute_values
    ADD CONSTRAINT product_assignedproducta_assignedproductattribute_ee1fc0ab_uniq UNIQUE (assignedproductattribute_id, attributevalue_id);


--
-- Name: product_assignedproductattribute product_assignedproducta_product_id_assignment_id_d7f5aab5_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_assignedproductattribute
    ADD CONSTRAINT product_assignedproducta_product_id_assignment_id_d7f5aab5_uniq UNIQUE (product_id, assignment_id);


--
-- Name: product_assignedproductattribute product_assignedproductattribute_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_assignedproductattribute
    ADD CONSTRAINT product_assignedproductattribute_pkey PRIMARY KEY (id);


--
-- Name: product_assignedproductattribute_values product_assignedproductattribute_values_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_assignedproductattribute_values
    ADD CONSTRAINT product_assignedproductattribute_values_pkey PRIMARY KEY (id);


--
-- Name: product_assignedvariantattribute_values product_assignedvarianta_assignedvariantattribute_8ffaee19_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_assignedvariantattribute_values
    ADD CONSTRAINT product_assignedvarianta_assignedvariantattribute_8ffaee19_uniq UNIQUE (assignedvariantattribute_id, attributevalue_id);


--
-- Name: product_assignedvariantattribute product_assignedvarianta_variant_id_assignment_id_16584418_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_assignedvariantattribute
    ADD CONSTRAINT product_assignedvarianta_variant_id_assignment_id_16584418_uniq UNIQUE (variant_id, assignment_id);


--
-- Name: product_assignedvariantattribute product_assignedvariantattribute_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_assignedvariantattribute
    ADD CONSTRAINT product_assignedvariantattribute_pkey PRIMARY KEY (id);


--
-- Name: product_assignedvariantattribute_values product_assignedvariantattribute_values_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_assignedvariantattribute_values
    ADD CONSTRAINT product_assignedvariantattribute_values_pkey PRIMARY KEY (id);


--
-- Name: product_attribute product_attribute_slug_a2ba35f2_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_attribute
    ADD CONSTRAINT product_attribute_slug_a2ba35f2_uniq UNIQUE (slug);


--
-- Name: product_attributevaluetranslation product_attributechoicev_language_code_attribute__9b58af18_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_attributevaluetranslation
    ADD CONSTRAINT product_attributechoicev_language_code_attribute__9b58af18_uniq UNIQUE (language_code, attribute_value_id);


--
-- Name: product_attributevalue product_attributechoicevalue_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_attributevalue
    ADD CONSTRAINT product_attributechoicevalue_pkey PRIMARY KEY (id);


--
-- Name: product_attributevaluetranslation product_attributechoicevaluetranslation_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_attributevaluetranslation
    ADD CONSTRAINT product_attributechoicevaluetranslation_pkey PRIMARY KEY (id);


--
-- Name: product_attributeproduct product_attributeproduct_attribute_id_product_typ_85ea87be_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_attributeproduct
    ADD CONSTRAINT product_attributeproduct_attribute_id_product_typ_85ea87be_uniq UNIQUE (attribute_id, product_type_id);


--
-- Name: product_attributeproduct product_attributeproduct_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_attributeproduct
    ADD CONSTRAINT product_attributeproduct_pkey PRIMARY KEY (id);


--
-- Name: product_attributevalue product_attributevalue_slug_attribute_id_a9b19472_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_attributevalue
    ADD CONSTRAINT product_attributevalue_slug_attribute_id_a9b19472_uniq UNIQUE (slug, attribute_id);


--
-- Name: product_attributevariant product_attributevariant_attribute_id_product_typ_304d6c95_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_attributevariant
    ADD CONSTRAINT product_attributevariant_attribute_id_product_typ_304d6c95_uniq UNIQUE (attribute_id, product_type_id);


--
-- Name: product_attributevariant product_attributevariant_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_attributevariant
    ADD CONSTRAINT product_attributevariant_pkey PRIMARY KEY (id);


--
-- Name: product_category product_category_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_category
    ADD CONSTRAINT product_category_pkey PRIMARY KEY (id);


--
-- Name: product_category product_category_slug_e1f8ccc4_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_category
    ADD CONSTRAINT product_category_slug_e1f8ccc4_uniq UNIQUE (slug);


--
-- Name: product_categorytranslation product_categorytranslat_language_code_category_i_f71fd11d_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_categorytranslation
    ADD CONSTRAINT product_categorytranslat_language_code_category_i_f71fd11d_uniq UNIQUE (language_code, category_id);


--
-- Name: product_categorytranslation product_categorytranslation_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_categorytranslation
    ADD CONSTRAINT product_categorytranslation_pkey PRIMARY KEY (id);


--
-- Name: product_collection product_collection_name_key; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_collection
    ADD CONSTRAINT product_collection_name_key UNIQUE (name);


--
-- Name: product_collection product_collection_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_collection
    ADD CONSTRAINT product_collection_pkey PRIMARY KEY (id);


--
-- Name: product_collectionproduct product_collection_products_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_collectionproduct
    ADD CONSTRAINT product_collection_products_pkey PRIMARY KEY (id);


--
-- Name: product_collection product_collection_slug_ec186116_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_collection
    ADD CONSTRAINT product_collection_slug_ec186116_uniq UNIQUE (slug);


--
-- Name: product_collectionproduct product_collectionproduc_collection_id_product_id_e582d799_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_collectionproduct
    ADD CONSTRAINT product_collectionproduc_collection_id_product_id_e582d799_uniq UNIQUE (collection_id, product_id);


--
-- Name: product_collectiontranslation product_collectiontransl_language_code_collection_b1200cd5_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_collectiontranslation
    ADD CONSTRAINT product_collectiontransl_language_code_collection_b1200cd5_uniq UNIQUE (language_code, collection_id);


--
-- Name: product_collectiontranslation product_collectiontranslation_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_collectiontranslation
    ADD CONSTRAINT product_collectiontranslation_pkey PRIMARY KEY (id);


--
-- Name: product_digitalcontent product_digitalcontent_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_digitalcontent
    ADD CONSTRAINT product_digitalcontent_pkey PRIMARY KEY (id);


--
-- Name: product_digitalcontent product_digitalcontent_product_variant_id_key; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_digitalcontent
    ADD CONSTRAINT product_digitalcontent_product_variant_id_key UNIQUE (product_variant_id);


--
-- Name: product_digitalcontenturl product_digitalcontenturl_line_id_key; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_digitalcontenturl
    ADD CONSTRAINT product_digitalcontenturl_line_id_key UNIQUE (line_id);


--
-- Name: product_digitalcontenturl product_digitalcontenturl_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_digitalcontenturl
    ADD CONSTRAINT product_digitalcontenturl_pkey PRIMARY KEY (id);


--
-- Name: product_digitalcontenturl product_digitalcontenturl_token_key; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_digitalcontenturl
    ADD CONSTRAINT product_digitalcontenturl_token_key UNIQUE (token);


--
-- Name: product_product product_product_default_variant_id_key; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_product
    ADD CONSTRAINT product_product_default_variant_id_key UNIQUE (default_variant_id);


--
-- Name: product_product product_product_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_product
    ADD CONSTRAINT product_product_pkey PRIMARY KEY (id);


--
-- Name: product_product product_product_slug_key; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_product
    ADD CONSTRAINT product_product_slug_key UNIQUE (slug);


--
-- Name: product_attributetranslation product_productattribute_language_code_product_at_58451db2_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_attributetranslation
    ADD CONSTRAINT product_productattribute_language_code_product_at_58451db2_uniq UNIQUE (language_code, attribute_id);


--
-- Name: product_attribute product_productattribute_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_attribute
    ADD CONSTRAINT product_productattribute_pkey PRIMARY KEY (id);


--
-- Name: product_attributetranslation product_productattributetranslation_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_attributetranslation
    ADD CONSTRAINT product_productattributetranslation_pkey PRIMARY KEY (id);


--
-- Name: product_producttype product_productclass_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_producttype
    ADD CONSTRAINT product_productclass_pkey PRIMARY KEY (id);


--
-- Name: product_productimage product_productimage_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_productimage
    ADD CONSTRAINT product_productimage_pkey PRIMARY KEY (id);


--
-- Name: product_producttranslation product_producttranslati_language_code_product_id_b06ba774_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_producttranslation
    ADD CONSTRAINT product_producttranslati_language_code_product_id_b06ba774_uniq UNIQUE (language_code, product_id);


--
-- Name: product_producttranslation product_producttranslation_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_producttranslation
    ADD CONSTRAINT product_producttranslation_pkey PRIMARY KEY (id);


--
-- Name: product_producttype product_producttype_slug_key; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_producttype
    ADD CONSTRAINT product_producttype_slug_key UNIQUE (slug);


--
-- Name: product_productvariant product_productvariant_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_productvariant
    ADD CONSTRAINT product_productvariant_pkey PRIMARY KEY (id);


--
-- Name: product_productvariant product_productvariant_sku_key; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_productvariant
    ADD CONSTRAINT product_productvariant_sku_key UNIQUE (sku);


--
-- Name: product_productvarianttranslation product_productvarianttr_language_code_product_va_cf16d8d0_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_productvarianttranslation
    ADD CONSTRAINT product_productvarianttr_language_code_product_va_cf16d8d0_uniq UNIQUE (language_code, product_variant_id);


--
-- Name: product_productvarianttranslation product_productvarianttranslation_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_productvarianttranslation
    ADD CONSTRAINT product_productvarianttranslation_pkey PRIMARY KEY (id);


--
-- Name: product_variantimage product_variantimage_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_variantimage
    ADD CONSTRAINT product_variantimage_pkey PRIMARY KEY (id);


--
-- Name: product_variantimage product_variantimage_variant_id_image_id_b19f327c_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_variantimage
    ADD CONSTRAINT product_variantimage_variant_id_image_id_b19f327c_uniq UNIQUE (variant_id, image_id);


--
-- Name: rest_framework_api_key_apikey rest_framework_api_key_apikey_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.rest_framework_api_key_apikey
    ADD CONSTRAINT rest_framework_api_key_apikey_pkey PRIMARY KEY (id);


--
-- Name: rest_framework_api_key_apikey rest_framework_api_key_apikey_prefix_key; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.rest_framework_api_key_apikey
    ADD CONSTRAINT rest_framework_api_key_apikey_prefix_key UNIQUE (prefix);


--
-- Name: shipping_shippingmethod shipping_shippingmethod_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.shipping_shippingmethod
    ADD CONSTRAINT shipping_shippingmethod_pkey PRIMARY KEY (id);


--
-- Name: shipping_shippingmethodtranslation shipping_shippingmethodt_language_code_shipping_m_70e4f786_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.shipping_shippingmethodtranslation
    ADD CONSTRAINT shipping_shippingmethodt_language_code_shipping_m_70e4f786_uniq UNIQUE (language_code, shipping_method_id);


--
-- Name: shipping_shippingmethodtranslation shipping_shippingmethodtranslation_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.shipping_shippingmethodtranslation
    ADD CONSTRAINT shipping_shippingmethodtranslation_pkey PRIMARY KEY (id);


--
-- Name: shipping_shippingzone shipping_shippingzone_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.shipping_shippingzone
    ADD CONSTRAINT shipping_shippingzone_pkey PRIMARY KEY (id);


--
-- Name: site_authorizationkey site_authorizationkey_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.site_authorizationkey
    ADD CONSTRAINT site_authorizationkey_pkey PRIMARY KEY (id);


--
-- Name: site_authorizationkey site_authorizationkey_site_settings_id_name_c5f8d1e6_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.site_authorizationkey
    ADD CONSTRAINT site_authorizationkey_site_settings_id_name_c5f8d1e6_uniq UNIQUE (site_settings_id, name);


--
-- Name: site_sitesettings site_sitesettings_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.site_sitesettings
    ADD CONSTRAINT site_sitesettings_pkey PRIMARY KEY (id);


--
-- Name: site_sitesettings site_sitesettings_site_id_key; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.site_sitesettings
    ADD CONSTRAINT site_sitesettings_site_id_key UNIQUE (site_id);


--
-- Name: site_sitesettingstranslation site_sitesettingstransla_language_code_site_setti_e767d9e7_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.site_sitesettingstranslation
    ADD CONSTRAINT site_sitesettingstransla_language_code_site_setti_e767d9e7_uniq UNIQUE (language_code, site_settings_id);


--
-- Name: site_sitesettingstranslation site_sitesettingstranslation_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.site_sitesettingstranslation
    ADD CONSTRAINT site_sitesettingstranslation_pkey PRIMARY KEY (id);


--
-- Name: account_address userprofile_address_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_address
    ADD CONSTRAINT userprofile_address_pkey PRIMARY KEY (id);


--
-- Name: account_user_addresses userprofile_user_addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_user_addresses
    ADD CONSTRAINT userprofile_user_addresses_pkey PRIMARY KEY (id);


--
-- Name: account_user_addresses userprofile_user_addresses_user_id_address_id_6cb87bcc_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_user_addresses
    ADD CONSTRAINT userprofile_user_addresses_user_id_address_id_6cb87bcc_uniq UNIQUE (user_id, address_id);


--
-- Name: account_user userprofile_user_email_key; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_user
    ADD CONSTRAINT userprofile_user_email_key UNIQUE (email);


--
-- Name: account_user_groups userprofile_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_user_groups
    ADD CONSTRAINT userprofile_user_groups_pkey PRIMARY KEY (id);


--
-- Name: account_user_groups userprofile_user_groups_user_id_group_id_90ce1781_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_user_groups
    ADD CONSTRAINT userprofile_user_groups_user_id_group_id_90ce1781_uniq UNIQUE (user_id, group_id);


--
-- Name: account_user userprofile_user_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_user
    ADD CONSTRAINT userprofile_user_pkey PRIMARY KEY (id);


--
-- Name: account_user_user_permissions userprofile_user_user_pe_user_id_permission_id_706d65c8_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_user_user_permissions
    ADD CONSTRAINT userprofile_user_user_pe_user_id_permission_id_706d65c8_uniq UNIQUE (user_id, permission_id);


--
-- Name: account_user_user_permissions userprofile_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_user_user_permissions
    ADD CONSTRAINT userprofile_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: warehouse_allocation warehouse_allocation_order_line_id_stock_id_aa103861_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.warehouse_allocation
    ADD CONSTRAINT warehouse_allocation_order_line_id_stock_id_aa103861_uniq UNIQUE (order_line_id, stock_id);


--
-- Name: warehouse_allocation warehouse_allocation_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.warehouse_allocation
    ADD CONSTRAINT warehouse_allocation_pkey PRIMARY KEY (id);


--
-- Name: warehouse_stock warehouse_stock_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.warehouse_stock
    ADD CONSTRAINT warehouse_stock_pkey PRIMARY KEY (id);


--
-- Name: warehouse_stock warehouse_stock_warehouse_id_product_variant_id_b04a0a40_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.warehouse_stock
    ADD CONSTRAINT warehouse_stock_warehouse_id_product_variant_id_b04a0a40_uniq UNIQUE (warehouse_id, product_variant_id);


--
-- Name: warehouse_warehouse warehouse_warehouse_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.warehouse_warehouse
    ADD CONSTRAINT warehouse_warehouse_pkey PRIMARY KEY (id);


--
-- Name: warehouse_warehouse_shipping_zones warehouse_warehouse_ship_warehouse_id_shippingzon_e18400fa_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.warehouse_warehouse_shipping_zones
    ADD CONSTRAINT warehouse_warehouse_ship_warehouse_id_shippingzon_e18400fa_uniq UNIQUE (warehouse_id, shippingzone_id);


--
-- Name: warehouse_warehouse_shipping_zones warehouse_warehouse_shipping_zones_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.warehouse_warehouse_shipping_zones
    ADD CONSTRAINT warehouse_warehouse_shipping_zones_pkey PRIMARY KEY (id);


--
-- Name: warehouse_warehouse warehouse_warehouse_slug_key; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.warehouse_warehouse
    ADD CONSTRAINT warehouse_warehouse_slug_key UNIQUE (slug);


--
-- Name: webhook_webhook webhook_webhook_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.webhook_webhook
    ADD CONSTRAINT webhook_webhook_pkey PRIMARY KEY (id);


--
-- Name: webhook_webhookevent webhook_webhookevent_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.webhook_webhookevent
    ADD CONSTRAINT webhook_webhookevent_pkey PRIMARY KEY (id);


--
-- Name: wishlist_wishlist wishlist_wishlist_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.wishlist_wishlist
    ADD CONSTRAINT wishlist_wishlist_pkey PRIMARY KEY (id);


--
-- Name: wishlist_wishlist wishlist_wishlist_token_key; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.wishlist_wishlist
    ADD CONSTRAINT wishlist_wishlist_token_key UNIQUE (token);


--
-- Name: wishlist_wishlist wishlist_wishlist_user_id_key; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.wishlist_wishlist
    ADD CONSTRAINT wishlist_wishlist_user_id_key UNIQUE (user_id);


--
-- Name: wishlist_wishlistitem wishlist_wishlistitem_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.wishlist_wishlistitem
    ADD CONSTRAINT wishlist_wishlistitem_pkey PRIMARY KEY (id);


--
-- Name: wishlist_wishlistitem_variants wishlist_wishlistitem_va_wishlistitem_id_productv_33a1ed29_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.wishlist_wishlistitem_variants
    ADD CONSTRAINT wishlist_wishlistitem_va_wishlistitem_id_productv_33a1ed29_uniq UNIQUE (wishlistitem_id, productvariant_id);


--
-- Name: wishlist_wishlistitem_variants wishlist_wishlistitem_variants_pkey; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.wishlist_wishlistitem_variants
    ADD CONSTRAINT wishlist_wishlistitem_variants_pkey PRIMARY KEY (id);


--
-- Name: wishlist_wishlistitem wishlist_wishlistitem_wishlist_id_product_id_3b73b644_uniq; Type: CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.wishlist_wishlistitem
    ADD CONSTRAINT wishlist_wishlistitem_wishlist_id_product_id_3b73b644_uniq UNIQUE (wishlist_id, product_id);


--
-- Name: account_customerevent_order_id_2d6e2d20; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX account_customerevent_order_id_2d6e2d20 ON public.account_customerevent USING btree (order_id);


--
-- Name: account_customerevent_user_id_b3d6ec36; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX account_customerevent_user_id_b3d6ec36 ON public.account_customerevent USING btree (user_id);


--
-- Name: account_customernote_customer_id_ec50cbf6; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX account_customernote_customer_id_ec50cbf6 ON public.account_customernote USING btree (customer_id);


--
-- Name: account_customernote_date_231c3474; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX account_customernote_date_231c3474 ON public.account_customernote USING btree (date);


--
-- Name: account_customernote_user_id_b10a6c14; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX account_customernote_user_id_b10a6c14 ON public.account_customernote USING btree (user_id);


--
-- Name: account_serviceaccount_permissions_permission_id_449791f0; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX account_serviceaccount_permissions_permission_id_449791f0 ON public.app_app_permissions USING btree (permission_id);


--
-- Name: account_serviceaccount_permissions_serviceaccount_id_ec78f497; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX account_serviceaccount_permissions_serviceaccount_id_ec78f497 ON public.app_app_permissions USING btree (app_id);


--
-- Name: account_serviceaccounttoken_auth_token_e4c38601_like; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX account_serviceaccounttoken_auth_token_e4c38601_like ON public.app_apptoken USING btree (auth_token varchar_pattern_ops);


--
-- Name: account_serviceaccounttoken_service_account_id_a8e6dee8; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX account_serviceaccounttoken_service_account_id_a8e6dee8 ON public.app_apptoken USING btree (app_id);


--
-- Name: account_staffnotificationrecipient_staff_email_a309b82e_like; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX account_staffnotificationrecipient_staff_email_a309b82e_like ON public.account_staffnotificationrecipient USING btree (staff_email varchar_pattern_ops);


--
-- Name: app_appinstallation_permissions_appinstallation_id_f7fe0271; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX app_appinstallation_permissions_appinstallation_id_f7fe0271 ON public.app_appinstallation_permissions USING btree (appinstallation_id);


--
-- Name: app_appinstallation_permissions_permission_id_4ee9f6c8; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX app_appinstallation_permissions_permission_id_4ee9f6c8 ON public.app_appinstallation_permissions USING btree (permission_id);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: cart_cart_billing_address_id_9eb62ddd; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX cart_cart_billing_address_id_9eb62ddd ON public.checkout_checkout USING btree (billing_address_id);


--
-- Name: cart_cart_shipping_address_id_adfddaf9; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX cart_cart_shipping_address_id_adfddaf9 ON public.checkout_checkout USING btree (shipping_address_id);


--
-- Name: cart_cart_shipping_method_id_835c02e0; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX cart_cart_shipping_method_id_835c02e0 ON public.checkout_checkout USING btree (shipping_method_id);


--
-- Name: cart_cart_user_id_9b4220b9; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX cart_cart_user_id_9b4220b9 ON public.checkout_checkout USING btree (user_id);


--
-- Name: cart_cartline_cart_id_c7b9981e; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX cart_cartline_cart_id_c7b9981e ON public.checkout_checkoutline USING btree (checkout_id);


--
-- Name: cart_cartline_product_id_1a54130f; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX cart_cartline_product_id_1a54130f ON public.checkout_checkoutline USING btree (variant_id);


--
-- Name: checkout_checkout_gift_cards_checkout_id_e314728d; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX checkout_checkout_gift_cards_checkout_id_e314728d ON public.checkout_checkout_gift_cards USING btree (checkout_id);


--
-- Name: checkout_checkout_gift_cards_giftcard_id_f5994462; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX checkout_checkout_gift_cards_giftcard_id_f5994462 ON public.checkout_checkout_gift_cards USING btree (giftcard_id);


--
-- Name: csv_exportevent_app_id_8637fcc5; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX csv_exportevent_app_id_8637fcc5 ON public.csv_exportevent USING btree (app_id);


--
-- Name: csv_exportevent_export_file_id_35f6c448; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX csv_exportevent_export_file_id_35f6c448 ON public.csv_exportevent USING btree (export_file_id);


--
-- Name: csv_exportevent_user_id_6111f193; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX csv_exportevent_user_id_6111f193 ON public.csv_exportevent USING btree (user_id);


--
-- Name: csv_exportfile_app_id_bc900999; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX csv_exportfile_app_id_bc900999 ON public.csv_exportfile USING btree (app_id);


--
-- Name: csv_exportfile_user_id_2c9071e6; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX csv_exportfile_user_id_2c9071e6 ON public.csv_exportfile USING btree (user_id);


--
-- Name: discount_sale_categories_category_id_64e132af; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX discount_sale_categories_category_id_64e132af ON public.discount_sale_categories USING btree (category_id);


--
-- Name: discount_sale_categories_sale_id_2aeee4a7; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX discount_sale_categories_sale_id_2aeee4a7 ON public.discount_sale_categories USING btree (sale_id);


--
-- Name: discount_sale_collections_collection_id_f66df9d7; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX discount_sale_collections_collection_id_f66df9d7 ON public.discount_sale_collections USING btree (collection_id);


--
-- Name: discount_sale_collections_sale_id_a912da4a; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX discount_sale_collections_sale_id_a912da4a ON public.discount_sale_collections USING btree (sale_id);


--
-- Name: discount_sale_products_product_id_d42c9636; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX discount_sale_products_product_id_d42c9636 ON public.discount_sale_products USING btree (product_id);


--
-- Name: discount_sale_products_sale_id_10e3a20f; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX discount_sale_products_sale_id_10e3a20f ON public.discount_sale_products USING btree (sale_id);


--
-- Name: discount_saletranslation_sale_id_36a69b0a; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX discount_saletranslation_sale_id_36a69b0a ON public.discount_saletranslation USING btree (sale_id);


--
-- Name: discount_voucher_categories_category_id_fc9d044a; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX discount_voucher_categories_category_id_fc9d044a ON public.discount_voucher_categories USING btree (category_id);


--
-- Name: discount_voucher_categories_voucher_id_19a56338; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX discount_voucher_categories_voucher_id_19a56338 ON public.discount_voucher_categories USING btree (voucher_id);


--
-- Name: discount_voucher_code_ff8dc52c_like; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX discount_voucher_code_ff8dc52c_like ON public.discount_voucher USING btree (code varchar_pattern_ops);


--
-- Name: discount_voucher_collections_collection_id_b9de6b54; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX discount_voucher_collections_collection_id_b9de6b54 ON public.discount_voucher_collections USING btree (collection_id);


--
-- Name: discount_voucher_collections_voucher_id_4ce1fde3; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX discount_voucher_collections_voucher_id_4ce1fde3 ON public.discount_voucher_collections USING btree (voucher_id);


--
-- Name: discount_voucher_products_product_id_4a3131ff; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX discount_voucher_products_product_id_4a3131ff ON public.discount_voucher_products USING btree (product_id);


--
-- Name: discount_voucher_products_voucher_id_8a2e6c3a; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX discount_voucher_products_voucher_id_8a2e6c3a ON public.discount_voucher_products USING btree (voucher_id);


--
-- Name: discount_vouchercustomer_voucher_id_bb55c04f; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX discount_vouchercustomer_voucher_id_bb55c04f ON public.discount_vouchercustomer USING btree (voucher_id);


--
-- Name: discount_vouchertranslation_voucher_id_288246a9; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX discount_vouchertranslation_voucher_id_288246a9 ON public.discount_vouchertranslation USING btree (voucher_id);


--
-- Name: django_prices_openexchan_to_currency_92c4a4e1_like; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX django_prices_openexchan_to_currency_92c4a4e1_like ON public.django_prices_openexchangerates_conversionrate USING btree (to_currency varchar_pattern_ops);


--
-- Name: django_prices_vatlayer_vat_country_code_858b2cc4; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX django_prices_vatlayer_vat_country_code_858b2cc4 ON public.django_prices_vatlayer_vat USING btree (country_code);


--
-- Name: django_prices_vatlayer_vat_country_code_858b2cc4_like; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX django_prices_vatlayer_vat_country_code_858b2cc4_like ON public.django_prices_vatlayer_vat USING btree (country_code varchar_pattern_ops);


--
-- Name: django_site_domain_a2e37b91_like; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX django_site_domain_a2e37b91_like ON public.django_site USING btree (domain varchar_pattern_ops);


--
-- Name: fusion_online_rfqlineitem_rfq_submission_id_f527f82a; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX fusion_online_rfqlineitem_rfq_submission_id_f527f82a ON public.fusion_online_rfqlineitem USING btree (rfq_submission_id);


--
-- Name: fusion_online_rfqsubmission_user_id_71b1d907; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX fusion_online_rfqsubmission_user_id_71b1d907 ON public.fusion_online_rfqsubmission USING btree (user_id);


--
-- Name: fusion_online_shippingaddress_address_id_575e32e6; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX fusion_online_shippingaddress_address_id_575e32e6 ON public.fusion_online_shippingaddress USING btree (address_id);


--
-- Name: giftcard_giftcard_code_f6fb6be8_like; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX giftcard_giftcard_code_f6fb6be8_like ON public.giftcard_giftcard USING btree (code varchar_pattern_ops);


--
-- Name: giftcard_giftcard_user_id_ce2401b5; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX giftcard_giftcard_user_id_ce2401b5 ON public.giftcard_giftcard USING btree (user_id);


--
-- Name: invoice_invoice_order_id_c5fc9ae9; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX invoice_invoice_order_id_c5fc9ae9 ON public.invoice_invoice USING btree (order_id);


--
-- Name: invoice_invoiceevent_invoice_id_de0632ca; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX invoice_invoiceevent_invoice_id_de0632ca ON public.invoice_invoiceevent USING btree (invoice_id);


--
-- Name: invoice_invoiceevent_order_id_5a337f7a; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX invoice_invoiceevent_order_id_5a337f7a ON public.invoice_invoiceevent USING btree (order_id);


--
-- Name: invoice_invoiceevent_user_id_cd599b8d; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX invoice_invoiceevent_user_id_cd599b8d ON public.invoice_invoiceevent USING btree (user_id);


--
-- Name: menu_menu_slug_98939c4e_like; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX menu_menu_slug_98939c4e_like ON public.menu_menu USING btree (slug varchar_pattern_ops);


--
-- Name: menu_menuitem_category_id_af353a3b; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX menu_menuitem_category_id_af353a3b ON public.menu_menuitem USING btree (category_id);


--
-- Name: menu_menuitem_collection_id_b913b19e; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX menu_menuitem_collection_id_b913b19e ON public.menu_menuitem USING btree (collection_id);


--
-- Name: menu_menuitem_menu_id_f466b139; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX menu_menuitem_menu_id_f466b139 ON public.menu_menuitem USING btree (menu_id);


--
-- Name: menu_menuitem_page_id_a0c8f92d; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX menu_menuitem_page_id_a0c8f92d ON public.menu_menuitem USING btree (page_id);


--
-- Name: menu_menuitem_parent_id_439f55a5; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX menu_menuitem_parent_id_439f55a5 ON public.menu_menuitem USING btree (parent_id);


--
-- Name: menu_menuitem_sort_order_f96ed184; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX menu_menuitem_sort_order_f96ed184 ON public.menu_menuitem USING btree (sort_order);


--
-- Name: menu_menuitem_tree_id_0d2e9c9a; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX menu_menuitem_tree_id_0d2e9c9a ON public.menu_menuitem USING btree (tree_id);


--
-- Name: menu_menuitemtranslation_menu_item_id_3445926c; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX menu_menuitemtranslation_menu_item_id_3445926c ON public.menu_menuitemtranslation USING btree (menu_item_id);


--
-- Name: order_fulfillment_order_id_02695111; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX order_fulfillment_order_id_02695111 ON public.order_fulfillment USING btree (order_id);


--
-- Name: order_fulfillmentline_fulfillment_id_68f3291d; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX order_fulfillmentline_fulfillment_id_68f3291d ON public.order_fulfillmentline USING btree (fulfillment_id);


--
-- Name: order_fulfillmentline_order_line_id_7d40e054; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX order_fulfillmentline_order_line_id_7d40e054 ON public.order_fulfillmentline USING btree (order_line_id);


--
-- Name: order_fulfillmentline_stock_id_da5a99fe; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX order_fulfillmentline_stock_id_da5a99fe ON public.order_fulfillmentline USING btree (stock_id);


--
-- Name: order_order_billing_address_id_8fe537cf; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX order_order_billing_address_id_8fe537cf ON public.order_order USING btree (billing_address_id);


--
-- Name: order_order_gift_cards_giftcard_id_f6844926; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX order_order_gift_cards_giftcard_id_f6844926 ON public.order_order_gift_cards USING btree (giftcard_id);


--
-- Name: order_order_gift_cards_order_id_ce5608c4; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX order_order_gift_cards_order_id_ce5608c4 ON public.order_order_gift_cards USING btree (order_id);


--
-- Name: order_order_shipping_address_id_57e64931; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX order_order_shipping_address_id_57e64931 ON public.order_order USING btree (shipping_address_id);


--
-- Name: order_order_shipping_method_id_2a742834; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX order_order_shipping_method_id_2a742834 ON public.order_order USING btree (shipping_method_id);


--
-- Name: order_order_token_ddb7fb7b_like; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX order_order_token_ddb7fb7b_like ON public.order_order USING btree (token varchar_pattern_ops);


--
-- Name: order_order_user_id_7cf9bc2b; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX order_order_user_id_7cf9bc2b ON public.order_order USING btree (user_id);


--
-- Name: order_order_voucher_id_0748ca22; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX order_order_voucher_id_0748ca22 ON public.order_order USING btree (voucher_id);


--
-- Name: order_orderevent_order_id_09aa7ccd; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX order_orderevent_order_id_09aa7ccd ON public.order_orderevent USING btree (order_id);


--
-- Name: order_orderevent_user_id_1056ac9c; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX order_orderevent_user_id_1056ac9c ON public.order_orderevent USING btree (user_id);


--
-- Name: order_orderline_order_id_eb04ec2d; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX order_orderline_order_id_eb04ec2d ON public.order_orderline USING btree (order_id);


--
-- Name: order_orderline_variant_id_866774cb; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX order_orderline_variant_id_866774cb ON public.order_orderline USING btree (variant_id);


--
-- Name: page_page_slug_d6b7c8ed_like; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX page_page_slug_d6b7c8ed_like ON public.page_page USING btree (slug varchar_pattern_ops);


--
-- Name: page_pagetranslation_page_id_60216ef5; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX page_pagetranslation_page_id_60216ef5 ON public.page_pagetranslation USING btree (page_id);


--
-- Name: payment_paymentmethod_checkout_id_5c0aae3d; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX payment_paymentmethod_checkout_id_5c0aae3d ON public.payment_payment USING btree (checkout_id);


--
-- Name: payment_paymentmethod_order_id_58acb979; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX payment_paymentmethod_order_id_58acb979 ON public.payment_payment USING btree (order_id);


--
-- Name: payment_transaction_payment_method_id_d35e75c1; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX payment_transaction_payment_method_id_d35e75c1 ON public.payment_transaction USING btree (payment_id);


--
-- Name: plugins_pluginconfiguration_identifier_3d7349fe_like; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX plugins_pluginconfiguration_identifier_3d7349fe_like ON public.plugins_pluginconfiguration USING btree (identifier varchar_pattern_ops);


--
-- Name: product_assignedproductatt_assignedproductattribute_i_6d497dfa; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_assignedproductatt_assignedproductattribute_i_6d497dfa ON public.product_assignedproductattribute_values USING btree (assignedproductattribute_id);


--
-- Name: product_assignedproductatt_attributevalue_id_5bd29b24; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_assignedproductatt_attributevalue_id_5bd29b24 ON public.product_assignedproductattribute_values USING btree (attributevalue_id);


--
-- Name: product_assignedproductattribute_assignment_id_eb2f81a4; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_assignedproductattribute_assignment_id_eb2f81a4 ON public.product_assignedproductattribute USING btree (assignment_id);


--
-- Name: product_assignedproductattribute_product_id_68be10a3; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_assignedproductattribute_product_id_68be10a3 ON public.product_assignedproductattribute USING btree (product_id);


--
-- Name: product_assignedvariantatt_assignedvariantattribute_i_8d6d62ef; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_assignedvariantatt_assignedvariantattribute_i_8d6d62ef ON public.product_assignedvariantattribute_values USING btree (assignedvariantattribute_id);


--
-- Name: product_assignedvariantatt_attributevalue_id_41cc2454; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_assignedvariantatt_attributevalue_id_41cc2454 ON public.product_assignedvariantattribute_values USING btree (attributevalue_id);


--
-- Name: product_assignedvariantattribute_assignment_id_8fdbffe8; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_assignedvariantattribute_assignment_id_8fdbffe8 ON public.product_assignedvariantattribute USING btree (assignment_id);


--
-- Name: product_assignedvariantattribute_variant_id_27483e6a; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_assignedvariantattribute_variant_id_27483e6a ON public.product_assignedvariantattribute USING btree (variant_id);


--
-- Name: product_attribute_slug_a2ba35f2_like; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_attribute_slug_a2ba35f2_like ON public.product_attribute USING btree (slug varchar_pattern_ops);


--
-- Name: product_attributechoiceval_attribute_choice_value_id_71c4c0a7; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_attributechoiceval_attribute_choice_value_id_71c4c0a7 ON public.product_attributevaluetranslation USING btree (attribute_value_id);


--
-- Name: product_attributechoicevalue_attribute_id_c28c6c92; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_attributechoicevalue_attribute_id_c28c6c92 ON public.product_attributevalue USING btree (attribute_id);


--
-- Name: product_attributechoicevalue_slug_e0d2d25b; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_attributechoicevalue_slug_e0d2d25b ON public.product_attributevalue USING btree (slug);


--
-- Name: product_attributechoicevalue_slug_e0d2d25b_like; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_attributechoicevalue_slug_e0d2d25b_like ON public.product_attributevalue USING btree (slug varchar_pattern_ops);


--
-- Name: product_attributechoicevalue_sort_order_c4c071c4; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_attributechoicevalue_sort_order_c4c071c4 ON public.product_attributevalue USING btree (sort_order);


--
-- Name: product_attributeproduct_attribute_id_0051c706; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_attributeproduct_attribute_id_0051c706 ON public.product_attributeproduct USING btree (attribute_id);


--
-- Name: product_attributeproduct_product_type_id_54357b3b; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_attributeproduct_product_type_id_54357b3b ON public.product_attributeproduct USING btree (product_type_id);


--
-- Name: product_attributeproduct_sort_order_cec8a8e2; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_attributeproduct_sort_order_cec8a8e2 ON public.product_attributeproduct USING btree (sort_order);


--
-- Name: product_attributevariant_attribute_id_e47d3bc3; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_attributevariant_attribute_id_e47d3bc3 ON public.product_attributevariant USING btree (attribute_id);


--
-- Name: product_attributevariant_product_type_id_ba95c6dd; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_attributevariant_product_type_id_ba95c6dd ON public.product_attributevariant USING btree (product_type_id);


--
-- Name: product_attributevariant_sort_order_cf4b00ef; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_attributevariant_sort_order_cf4b00ef ON public.product_attributevariant USING btree (sort_order);


--
-- Name: product_category_parent_id_f6860923; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_category_parent_id_f6860923 ON public.product_category USING btree (parent_id);


--
-- Name: product_category_slug_e1f8ccc4_like; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_category_slug_e1f8ccc4_like ON public.product_category USING btree (slug varchar_pattern_ops);


--
-- Name: product_category_tree_id_f3c46461; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_category_tree_id_f3c46461 ON public.product_category USING btree (tree_id);


--
-- Name: product_categorytranslation_category_id_aa8d0917; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_categorytranslation_category_id_aa8d0917 ON public.product_categorytranslation USING btree (category_id);


--
-- Name: product_collection_name_03bb818b_like; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_collection_name_03bb818b_like ON public.product_collection USING btree (name varchar_pattern_ops);


--
-- Name: product_collection_products_collection_id_0bc817dc; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_collection_products_collection_id_0bc817dc ON public.product_collectionproduct USING btree (collection_id);


--
-- Name: product_collection_products_product_id_a45a5b06; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_collection_products_product_id_a45a5b06 ON public.product_collectionproduct USING btree (product_id);


--
-- Name: product_collection_slug_ec186116_like; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_collection_slug_ec186116_like ON public.product_collection USING btree (slug varchar_pattern_ops);


--
-- Name: product_collectionproduct_sort_order_5e7b55bb; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_collectionproduct_sort_order_5e7b55bb ON public.product_collectionproduct USING btree (sort_order);


--
-- Name: product_collectiontranslation_collection_id_cfbbd453; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_collectiontranslation_collection_id_cfbbd453 ON public.product_collectiontranslation USING btree (collection_id);


--
-- Name: product_digitalcontenturl_content_id_654197bd; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_digitalcontenturl_content_id_654197bd ON public.product_digitalcontenturl USING btree (content_id);


--
-- Name: product_product_category_id_0c725779; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_product_category_id_0c725779 ON public.product_product USING btree (category_id);


--
-- Name: product_product_product_class_id_0547c998; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_product_product_class_id_0547c998 ON public.product_product USING btree (product_type_id);


--
-- Name: product_product_slug_76cde0ae_like; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_product_slug_76cde0ae_like ON public.product_product USING btree (slug varchar_pattern_ops);


--
-- Name: product_productattributetr_product_attribute_id_56b48511; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_productattributetr_product_attribute_id_56b48511 ON public.product_attributetranslation USING btree (attribute_id);


--
-- Name: product_productimage_product_id_544084bb; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_productimage_product_id_544084bb ON public.product_productimage USING btree (product_id);


--
-- Name: product_productimage_sort_order_dfda9c19; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_productimage_sort_order_dfda9c19 ON public.product_productimage USING btree (sort_order);


--
-- Name: product_producttranslation_product_id_2c2c7532; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_producttranslation_product_id_2c2c7532 ON public.product_producttranslation USING btree (product_id);


--
-- Name: product_producttype_slug_6871faf2_like; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_producttype_slug_6871faf2_like ON public.product_producttype USING btree (slug varchar_pattern_ops);


--
-- Name: product_productvariant_product_id_43c5a310; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_productvariant_product_id_43c5a310 ON public.product_productvariant USING btree (product_id);


--
-- Name: product_productvariant_sku_50706818_like; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_productvariant_sku_50706818_like ON public.product_productvariant USING btree (sku varchar_pattern_ops);


--
-- Name: product_productvariant_sort_order_d4acf89b; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_productvariant_sort_order_d4acf89b ON public.product_productvariant USING btree (sort_order);


--
-- Name: product_productvarianttranslation_product_variant_id_1b144a85; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_productvarianttranslation_product_variant_id_1b144a85 ON public.product_productvarianttranslation USING btree (product_variant_id);


--
-- Name: product_variantimage_image_id_bef14106; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_variantimage_image_id_bef14106 ON public.product_variantimage USING btree (image_id);


--
-- Name: product_variantimage_variant_id_81123814; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX product_variantimage_variant_id_81123814 ON public.product_variantimage USING btree (variant_id);


--
-- Name: rest_framework_api_key_apikey_created_c61872d9; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX rest_framework_api_key_apikey_created_c61872d9 ON public.rest_framework_api_key_apikey USING btree (created);


--
-- Name: rest_framework_api_key_apikey_id_6e07e68e_like; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX rest_framework_api_key_apikey_id_6e07e68e_like ON public.rest_framework_api_key_apikey USING btree (id varchar_pattern_ops);


--
-- Name: rest_framework_api_key_apikey_prefix_4e0db5f8_like; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX rest_framework_api_key_apikey_prefix_4e0db5f8_like ON public.rest_framework_api_key_apikey USING btree (prefix varchar_pattern_ops);


--
-- Name: shipping_shippingmethod_shipping_zone_id_265b7413; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX shipping_shippingmethod_shipping_zone_id_265b7413 ON public.shipping_shippingmethod USING btree (shipping_zone_id);


--
-- Name: shipping_shippingmethodtranslation_shipping_method_id_31d925d2; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX shipping_shippingmethodtranslation_shipping_method_id_31d925d2 ON public.shipping_shippingmethodtranslation USING btree (shipping_method_id);


--
-- Name: site_authorizationkey_site_settings_id_d8397c0f; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX site_authorizationkey_site_settings_id_d8397c0f ON public.site_authorizationkey USING btree (site_settings_id);


--
-- Name: site_sitesettings_bottom_menu_id_e2a78098; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX site_sitesettings_bottom_menu_id_e2a78098 ON public.site_sitesettings USING btree (bottom_menu_id);


--
-- Name: site_sitesettings_company_address_id_f0825427; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX site_sitesettings_company_address_id_f0825427 ON public.site_sitesettings USING btree (company_address_id);


--
-- Name: site_sitesettings_homepage_collection_id_82f45d33; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX site_sitesettings_homepage_collection_id_82f45d33 ON public.site_sitesettings USING btree (homepage_collection_id);


--
-- Name: site_sitesettings_top_menu_id_ab6f8c46; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX site_sitesettings_top_menu_id_ab6f8c46 ON public.site_sitesettings USING btree (top_menu_id);


--
-- Name: site_sitesettingstranslation_site_settings_id_ca085ff6; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX site_sitesettingstranslation_site_settings_id_ca085ff6 ON public.site_sitesettingstranslation USING btree (site_settings_id);


--
-- Name: userprofile_user_addresses_address_id_ad7646b4; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX userprofile_user_addresses_address_id_ad7646b4 ON public.account_user_addresses USING btree (address_id);


--
-- Name: userprofile_user_addresses_user_id_bb5aa55e; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX userprofile_user_addresses_user_id_bb5aa55e ON public.account_user_addresses USING btree (user_id);


--
-- Name: userprofile_user_default_billing_address_id_0489abf1; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX userprofile_user_default_billing_address_id_0489abf1 ON public.account_user USING btree (default_billing_address_id);


--
-- Name: userprofile_user_default_shipping_address_id_aae7a203; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX userprofile_user_default_shipping_address_id_aae7a203 ON public.account_user USING btree (default_shipping_address_id);


--
-- Name: userprofile_user_email_b0fb0137_like; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX userprofile_user_email_b0fb0137_like ON public.account_user USING btree (email varchar_pattern_ops);


--
-- Name: userprofile_user_groups_group_id_c7eec74e; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX userprofile_user_groups_group_id_c7eec74e ON public.account_user_groups USING btree (group_id);


--
-- Name: userprofile_user_groups_user_id_5e712a24; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX userprofile_user_groups_user_id_5e712a24 ON public.account_user_groups USING btree (user_id);


--
-- Name: userprofile_user_user_permissions_permission_id_1caa8a71; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX userprofile_user_user_permissions_permission_id_1caa8a71 ON public.account_user_user_permissions USING btree (permission_id);


--
-- Name: userprofile_user_user_permissions_user_id_6d654469; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX userprofile_user_user_permissions_user_id_6d654469 ON public.account_user_user_permissions USING btree (user_id);


--
-- Name: warehouse_allocation_order_line_id_693dcb84; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX warehouse_allocation_order_line_id_693dcb84 ON public.warehouse_allocation USING btree (order_line_id);


--
-- Name: warehouse_allocation_stock_id_73541542; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX warehouse_allocation_stock_id_73541542 ON public.warehouse_allocation USING btree (stock_id);


--
-- Name: warehouse_stock_product_variant_id_bea58a82; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX warehouse_stock_product_variant_id_bea58a82 ON public.warehouse_stock USING btree (product_variant_id);


--
-- Name: warehouse_stock_warehouse_id_cc9d4e5d; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX warehouse_stock_warehouse_id_cc9d4e5d ON public.warehouse_stock USING btree (warehouse_id);


--
-- Name: warehouse_warehouse_address_id_d46e1096; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX warehouse_warehouse_address_id_d46e1096 ON public.warehouse_warehouse USING btree (address_id);


--
-- Name: warehouse_warehouse_shipping_zones_shippingzone_id_aeee255b; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX warehouse_warehouse_shipping_zones_shippingzone_id_aeee255b ON public.warehouse_warehouse_shipping_zones USING btree (shippingzone_id);


--
-- Name: warehouse_warehouse_shipping_zones_warehouse_id_fccd6647; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX warehouse_warehouse_shipping_zones_warehouse_id_fccd6647 ON public.warehouse_warehouse_shipping_zones USING btree (warehouse_id);


--
-- Name: warehouse_warehouse_slug_5ca9c575_like; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX warehouse_warehouse_slug_5ca9c575_like ON public.warehouse_warehouse USING btree (slug varchar_pattern_ops);


--
-- Name: webhook_webhook_service_account_id_1073b057; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX webhook_webhook_service_account_id_1073b057 ON public.webhook_webhook USING btree (app_id);


--
-- Name: webhook_webhookevent_event_type_cd6b8c13; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX webhook_webhookevent_event_type_cd6b8c13 ON public.webhook_webhookevent USING btree (event_type);


--
-- Name: webhook_webhookevent_event_type_cd6b8c13_like; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX webhook_webhookevent_event_type_cd6b8c13_like ON public.webhook_webhookevent USING btree (event_type varchar_pattern_ops);


--
-- Name: webhook_webhookevent_webhook_id_73b5c9e1; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX webhook_webhookevent_webhook_id_73b5c9e1 ON public.webhook_webhookevent USING btree (webhook_id);


--
-- Name: wishlist_wishlistitem_product_id_8309716a; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX wishlist_wishlistitem_product_id_8309716a ON public.wishlist_wishlistitem USING btree (product_id);


--
-- Name: wishlist_wishlistitem_variants_productvariant_id_819ee66b; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX wishlist_wishlistitem_variants_productvariant_id_819ee66b ON public.wishlist_wishlistitem_variants USING btree (productvariant_id);


--
-- Name: wishlist_wishlistitem_variants_wishlistitem_id_ee616761; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX wishlist_wishlistitem_variants_wishlistitem_id_ee616761 ON public.wishlist_wishlistitem_variants USING btree (wishlistitem_id);


--
-- Name: wishlist_wishlistitem_wishlist_id_a052b63d; Type: INDEX; Schema: public; Owner: saleor
--

CREATE INDEX wishlist_wishlistitem_wishlist_id_a052b63d ON public.wishlist_wishlistitem USING btree (wishlist_id);


--
-- Name: account_customerevent account_customerevent_order_id_2d6e2d20_fk_order_order_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_customerevent
    ADD CONSTRAINT account_customerevent_order_id_2d6e2d20_fk_order_order_id FOREIGN KEY (order_id) REFERENCES public.order_order(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: account_customerevent account_customerevent_user_id_b3d6ec36_fk_account_user_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_customerevent
    ADD CONSTRAINT account_customerevent_user_id_b3d6ec36_fk_account_user_id FOREIGN KEY (user_id) REFERENCES public.account_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: account_customernote account_customernote_customer_id_ec50cbf6_fk_account_user_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_customernote
    ADD CONSTRAINT account_customernote_customer_id_ec50cbf6_fk_account_user_id FOREIGN KEY (customer_id) REFERENCES public.account_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: account_customernote account_customernote_user_id_b10a6c14_fk_account_user_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_customernote
    ADD CONSTRAINT account_customernote_user_id_b10a6c14_fk_account_user_id FOREIGN KEY (user_id) REFERENCES public.account_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: account_staffnotificationrecipient account_staffnotific_user_id_538fa3a4_fk_account_u; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_staffnotificationrecipient
    ADD CONSTRAINT account_staffnotific_user_id_538fa3a4_fk_account_u FOREIGN KEY (user_id) REFERENCES public.account_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: account_user_addresses account_user_address_address_id_d218822a_fk_account_a; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_user_addresses
    ADD CONSTRAINT account_user_address_address_id_d218822a_fk_account_a FOREIGN KEY (address_id) REFERENCES public.account_address(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: account_user_addresses account_user_addresses_user_id_2fcc8301_fk_account_user_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_user_addresses
    ADD CONSTRAINT account_user_addresses_user_id_2fcc8301_fk_account_user_id FOREIGN KEY (user_id) REFERENCES public.account_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: app_app_permissions app_app_permissions_app_id_5941597d_fk_app_app_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.app_app_permissions
    ADD CONSTRAINT app_app_permissions_app_id_5941597d_fk_app_app_id FOREIGN KEY (app_id) REFERENCES public.app_app(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: app_app_permissions app_app_permissions_permission_id_defe4a88_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.app_app_permissions
    ADD CONSTRAINT app_app_permissions_permission_id_defe4a88_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: app_appinstallation_permissions app_appinstallation__appinstallation_id_f7fe0271_fk_app_appin; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.app_appinstallation_permissions
    ADD CONSTRAINT app_appinstallation__appinstallation_id_f7fe0271_fk_app_appin FOREIGN KEY (appinstallation_id) REFERENCES public.app_appinstallation(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: app_appinstallation_permissions app_appinstallation__permission_id_4ee9f6c8_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.app_appinstallation_permissions
    ADD CONSTRAINT app_appinstallation__permission_id_4ee9f6c8_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: app_apptoken app_apptoken_app_id_68561141_fk_app_app_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.app_apptoken
    ADD CONSTRAINT app_apptoken_app_id_68561141_fk_app_app_id FOREIGN KEY (app_id) REFERENCES public.app_app(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: checkout_checkout cart_cart_billing_address_id_9eb62ddd_fk_account_address_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.checkout_checkout
    ADD CONSTRAINT cart_cart_billing_address_id_9eb62ddd_fk_account_address_id FOREIGN KEY (billing_address_id) REFERENCES public.account_address(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: checkout_checkout cart_cart_shipping_address_id_adfddaf9_fk_account_address_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.checkout_checkout
    ADD CONSTRAINT cart_cart_shipping_address_id_adfddaf9_fk_account_address_id FOREIGN KEY (shipping_address_id) REFERENCES public.account_address(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: checkout_checkoutline cart_cartline_variant_id_dbca56c9_fk_product_productvariant_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.checkout_checkoutline
    ADD CONSTRAINT cart_cartline_variant_id_dbca56c9_fk_product_productvariant_id FOREIGN KEY (variant_id) REFERENCES public.product_productvariant(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: checkout_checkoutline checkout_cartline_checkout_id_41d95a5d_fk_checkout_; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.checkout_checkoutline
    ADD CONSTRAINT checkout_cartline_checkout_id_41d95a5d_fk_checkout_ FOREIGN KEY (checkout_id) REFERENCES public.checkout_checkout(token) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: checkout_checkout_gift_cards checkout_checkout_gi_checkout_id_e314728d_fk_checkout_; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.checkout_checkout_gift_cards
    ADD CONSTRAINT checkout_checkout_gi_checkout_id_e314728d_fk_checkout_ FOREIGN KEY (checkout_id) REFERENCES public.checkout_checkout(token) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: checkout_checkout_gift_cards checkout_checkout_gi_giftcard_id_f5994462_fk_giftcard_; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.checkout_checkout_gift_cards
    ADD CONSTRAINT checkout_checkout_gi_giftcard_id_f5994462_fk_giftcard_ FOREIGN KEY (giftcard_id) REFERENCES public.giftcard_giftcard(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: checkout_checkout checkout_checkout_shipping_method_id_8796abd0_fk_shipping_; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.checkout_checkout
    ADD CONSTRAINT checkout_checkout_shipping_method_id_8796abd0_fk_shipping_ FOREIGN KEY (shipping_method_id) REFERENCES public.shipping_shippingmethod(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: checkout_checkout checkout_checkout_user_id_8b2fe298_fk_account_user_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.checkout_checkout
    ADD CONSTRAINT checkout_checkout_user_id_8b2fe298_fk_account_user_id FOREIGN KEY (user_id) REFERENCES public.account_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: csv_exportevent csv_exportevent_app_id_8637fcc5_fk_app_app_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.csv_exportevent
    ADD CONSTRAINT csv_exportevent_app_id_8637fcc5_fk_app_app_id FOREIGN KEY (app_id) REFERENCES public.app_app(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: csv_exportevent csv_exportevent_export_file_id_35f6c448_fk_csv_exportfile_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.csv_exportevent
    ADD CONSTRAINT csv_exportevent_export_file_id_35f6c448_fk_csv_exportfile_id FOREIGN KEY (export_file_id) REFERENCES public.csv_exportfile(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: csv_exportevent csv_exportevent_user_id_6111f193_fk_account_user_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.csv_exportevent
    ADD CONSTRAINT csv_exportevent_user_id_6111f193_fk_account_user_id FOREIGN KEY (user_id) REFERENCES public.account_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: csv_exportfile csv_exportfile_app_id_bc900999_fk_app_app_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.csv_exportfile
    ADD CONSTRAINT csv_exportfile_app_id_bc900999_fk_app_app_id FOREIGN KEY (app_id) REFERENCES public.app_app(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: csv_exportfile csv_exportfile_user_id_2c9071e6_fk_account_user_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.csv_exportfile
    ADD CONSTRAINT csv_exportfile_user_id_2c9071e6_fk_account_user_id FOREIGN KEY (user_id) REFERENCES public.account_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: discount_sale_categories discount_sale_catego_category_id_64e132af_fk_product_c; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_sale_categories
    ADD CONSTRAINT discount_sale_catego_category_id_64e132af_fk_product_c FOREIGN KEY (category_id) REFERENCES public.product_category(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: discount_sale_categories discount_sale_categories_sale_id_2aeee4a7_fk_discount_sale_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_sale_categories
    ADD CONSTRAINT discount_sale_categories_sale_id_2aeee4a7_fk_discount_sale_id FOREIGN KEY (sale_id) REFERENCES public.discount_sale(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: discount_sale_collections discount_sale_collec_collection_id_f66df9d7_fk_product_c; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_sale_collections
    ADD CONSTRAINT discount_sale_collec_collection_id_f66df9d7_fk_product_c FOREIGN KEY (collection_id) REFERENCES public.product_collection(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: discount_sale_collections discount_sale_collections_sale_id_a912da4a_fk_discount_sale_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_sale_collections
    ADD CONSTRAINT discount_sale_collections_sale_id_a912da4a_fk_discount_sale_id FOREIGN KEY (sale_id) REFERENCES public.discount_sale(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: discount_sale_products discount_sale_produc_product_id_d42c9636_fk_product_p; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_sale_products
    ADD CONSTRAINT discount_sale_produc_product_id_d42c9636_fk_product_p FOREIGN KEY (product_id) REFERENCES public.product_product(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: discount_sale_products discount_sale_products_sale_id_10e3a20f_fk_discount_sale_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_sale_products
    ADD CONSTRAINT discount_sale_products_sale_id_10e3a20f_fk_discount_sale_id FOREIGN KEY (sale_id) REFERENCES public.discount_sale(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: discount_saletranslation discount_saletranslation_sale_id_36a69b0a_fk_discount_sale_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_saletranslation
    ADD CONSTRAINT discount_saletranslation_sale_id_36a69b0a_fk_discount_sale_id FOREIGN KEY (sale_id) REFERENCES public.discount_sale(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: discount_voucher_categories discount_voucher_cat_category_id_fc9d044a_fk_product_c; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_voucher_categories
    ADD CONSTRAINT discount_voucher_cat_category_id_fc9d044a_fk_product_c FOREIGN KEY (category_id) REFERENCES public.product_category(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: discount_voucher_categories discount_voucher_cat_voucher_id_19a56338_fk_discount_; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_voucher_categories
    ADD CONSTRAINT discount_voucher_cat_voucher_id_19a56338_fk_discount_ FOREIGN KEY (voucher_id) REFERENCES public.discount_voucher(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: discount_voucher_collections discount_voucher_col_collection_id_b9de6b54_fk_product_c; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_voucher_collections
    ADD CONSTRAINT discount_voucher_col_collection_id_b9de6b54_fk_product_c FOREIGN KEY (collection_id) REFERENCES public.product_collection(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: discount_voucher_collections discount_voucher_col_voucher_id_4ce1fde3_fk_discount_; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_voucher_collections
    ADD CONSTRAINT discount_voucher_col_voucher_id_4ce1fde3_fk_discount_ FOREIGN KEY (voucher_id) REFERENCES public.discount_voucher(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: discount_voucher_products discount_voucher_pro_product_id_4a3131ff_fk_product_p; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_voucher_products
    ADD CONSTRAINT discount_voucher_pro_product_id_4a3131ff_fk_product_p FOREIGN KEY (product_id) REFERENCES public.product_product(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: discount_voucher_products discount_voucher_pro_voucher_id_8a2e6c3a_fk_discount_; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_voucher_products
    ADD CONSTRAINT discount_voucher_pro_voucher_id_8a2e6c3a_fk_discount_ FOREIGN KEY (voucher_id) REFERENCES public.discount_voucher(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: discount_vouchercustomer discount_vouchercust_voucher_id_bb55c04f_fk_discount_; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_vouchercustomer
    ADD CONSTRAINT discount_vouchercust_voucher_id_bb55c04f_fk_discount_ FOREIGN KEY (voucher_id) REFERENCES public.discount_voucher(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: discount_vouchertranslation discount_vouchertran_voucher_id_288246a9_fk_discount_; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.discount_vouchertranslation
    ADD CONSTRAINT discount_vouchertran_voucher_id_288246a9_fk_discount_ FOREIGN KEY (voucher_id) REFERENCES public.discount_voucher(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: fusion_online_offer fusion_online_offer_product_variant_id_4c6295fc_fk_product_p; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.fusion_online_offer
    ADD CONSTRAINT fusion_online_offer_product_variant_id_4c6295fc_fk_product_p FOREIGN KEY (product_variant_id) REFERENCES public.product_productvariant(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: fusion_online_rfqlineitem fusion_online_rfqlin_rfq_submission_id_f527f82a_fk_fusion_on; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.fusion_online_rfqlineitem
    ADD CONSTRAINT fusion_online_rfqlin_rfq_submission_id_f527f82a_fk_fusion_on FOREIGN KEY (rfq_submission_id) REFERENCES public.fusion_online_rfqsubmission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: fusion_online_rfqresponse fusion_online_rfqres_line_item_id_f21ac3de_fk_fusion_on; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.fusion_online_rfqresponse
    ADD CONSTRAINT fusion_online_rfqres_line_item_id_f21ac3de_fk_fusion_on FOREIGN KEY (line_item_id) REFERENCES public.fusion_online_rfqlineitem(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: fusion_online_rfqsubmission fusion_online_rfqsubmission_user_id_71b1d907_fk_account_user_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.fusion_online_rfqsubmission
    ADD CONSTRAINT fusion_online_rfqsubmission_user_id_71b1d907_fk_account_user_id FOREIGN KEY (user_id) REFERENCES public.account_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: fusion_online_shippingaddress fusion_online_shippi_address_id_575e32e6_fk_account_a; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.fusion_online_shippingaddress
    ADD CONSTRAINT fusion_online_shippi_address_id_575e32e6_fk_account_a FOREIGN KEY (address_id) REFERENCES public.account_address(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: giftcard_giftcard giftcard_giftcard_user_id_ce2401b5_fk_account_user_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.giftcard_giftcard
    ADD CONSTRAINT giftcard_giftcard_user_id_ce2401b5_fk_account_user_id FOREIGN KEY (user_id) REFERENCES public.account_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: invoice_invoice invoice_invoice_order_id_c5fc9ae9_fk_order_order_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.invoice_invoice
    ADD CONSTRAINT invoice_invoice_order_id_c5fc9ae9_fk_order_order_id FOREIGN KEY (order_id) REFERENCES public.order_order(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: invoice_invoiceevent invoice_invoiceevent_invoice_id_de0632ca_fk_invoice_invoice_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.invoice_invoiceevent
    ADD CONSTRAINT invoice_invoiceevent_invoice_id_de0632ca_fk_invoice_invoice_id FOREIGN KEY (invoice_id) REFERENCES public.invoice_invoice(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: invoice_invoiceevent invoice_invoiceevent_order_id_5a337f7a_fk_order_order_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.invoice_invoiceevent
    ADD CONSTRAINT invoice_invoiceevent_order_id_5a337f7a_fk_order_order_id FOREIGN KEY (order_id) REFERENCES public.order_order(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: invoice_invoiceevent invoice_invoiceevent_user_id_cd599b8d_fk_account_user_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.invoice_invoiceevent
    ADD CONSTRAINT invoice_invoiceevent_user_id_cd599b8d_fk_account_user_id FOREIGN KEY (user_id) REFERENCES public.account_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: menu_menuitem menu_menuitem_category_id_af353a3b_fk_product_category_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.menu_menuitem
    ADD CONSTRAINT menu_menuitem_category_id_af353a3b_fk_product_category_id FOREIGN KEY (category_id) REFERENCES public.product_category(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: menu_menuitem menu_menuitem_collection_id_b913b19e_fk_product_collection_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.menu_menuitem
    ADD CONSTRAINT menu_menuitem_collection_id_b913b19e_fk_product_collection_id FOREIGN KEY (collection_id) REFERENCES public.product_collection(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: menu_menuitem menu_menuitem_menu_id_f466b139_fk_menu_menu_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.menu_menuitem
    ADD CONSTRAINT menu_menuitem_menu_id_f466b139_fk_menu_menu_id FOREIGN KEY (menu_id) REFERENCES public.menu_menu(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: menu_menuitem menu_menuitem_page_id_a0c8f92d_fk_page_page_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.menu_menuitem
    ADD CONSTRAINT menu_menuitem_page_id_a0c8f92d_fk_page_page_id FOREIGN KEY (page_id) REFERENCES public.page_page(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: menu_menuitem menu_menuitem_parent_id_439f55a5_fk_menu_menuitem_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.menu_menuitem
    ADD CONSTRAINT menu_menuitem_parent_id_439f55a5_fk_menu_menuitem_id FOREIGN KEY (parent_id) REFERENCES public.menu_menuitem(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: menu_menuitemtranslation menu_menuitemtransla_menu_item_id_3445926c_fk_menu_menu; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.menu_menuitemtranslation
    ADD CONSTRAINT menu_menuitemtransla_menu_item_id_3445926c_fk_menu_menu FOREIGN KEY (menu_item_id) REFERENCES public.menu_menuitem(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: order_fulfillment order_fulfillment_order_id_02695111_fk_order_order_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.order_fulfillment
    ADD CONSTRAINT order_fulfillment_order_id_02695111_fk_order_order_id FOREIGN KEY (order_id) REFERENCES public.order_order(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: order_fulfillmentline order_fulfillmentlin_fulfillment_id_68f3291d_fk_order_ful; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.order_fulfillmentline
    ADD CONSTRAINT order_fulfillmentlin_fulfillment_id_68f3291d_fk_order_ful FOREIGN KEY (fulfillment_id) REFERENCES public.order_fulfillment(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: order_fulfillmentline order_fulfillmentlin_order_line_id_7d40e054_fk_order_ord; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.order_fulfillmentline
    ADD CONSTRAINT order_fulfillmentlin_order_line_id_7d40e054_fk_order_ord FOREIGN KEY (order_line_id) REFERENCES public.order_orderline(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: order_fulfillmentline order_fulfillmentline_stock_id_da5a99fe_fk_warehouse_stock_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.order_fulfillmentline
    ADD CONSTRAINT order_fulfillmentline_stock_id_da5a99fe_fk_warehouse_stock_id FOREIGN KEY (stock_id) REFERENCES public.warehouse_stock(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: order_order order_order_billing_address_id_8fe537cf_fk_userprofi; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.order_order
    ADD CONSTRAINT order_order_billing_address_id_8fe537cf_fk_userprofi FOREIGN KEY (billing_address_id) REFERENCES public.account_address(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: order_order_gift_cards order_order_gift_car_giftcard_id_f6844926_fk_giftcard_; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.order_order_gift_cards
    ADD CONSTRAINT order_order_gift_car_giftcard_id_f6844926_fk_giftcard_ FOREIGN KEY (giftcard_id) REFERENCES public.giftcard_giftcard(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: order_order_gift_cards order_order_gift_cards_order_id_ce5608c4_fk_order_order_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.order_order_gift_cards
    ADD CONSTRAINT order_order_gift_cards_order_id_ce5608c4_fk_order_order_id FOREIGN KEY (order_id) REFERENCES public.order_order(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: order_order order_order_shipping_address_id_57e64931_fk_userprofi; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.order_order
    ADD CONSTRAINT order_order_shipping_address_id_57e64931_fk_userprofi FOREIGN KEY (shipping_address_id) REFERENCES public.account_address(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: order_order order_order_shipping_method_id_2a742834_fk_shipping_; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.order_order
    ADD CONSTRAINT order_order_shipping_method_id_2a742834_fk_shipping_ FOREIGN KEY (shipping_method_id) REFERENCES public.shipping_shippingmethod(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: order_order order_order_user_id_7cf9bc2b_fk_userprofile_user_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.order_order
    ADD CONSTRAINT order_order_user_id_7cf9bc2b_fk_userprofile_user_id FOREIGN KEY (user_id) REFERENCES public.account_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: order_order order_order_voucher_id_0748ca22_fk_discount_voucher_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.order_order
    ADD CONSTRAINT order_order_voucher_id_0748ca22_fk_discount_voucher_id FOREIGN KEY (voucher_id) REFERENCES public.discount_voucher(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: order_orderevent order_orderevent_order_id_09aa7ccd_fk_order_order_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.order_orderevent
    ADD CONSTRAINT order_orderevent_order_id_09aa7ccd_fk_order_order_id FOREIGN KEY (order_id) REFERENCES public.order_order(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: order_orderevent order_orderevent_user_id_1056ac9c_fk_userprofile_user_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.order_orderevent
    ADD CONSTRAINT order_orderevent_user_id_1056ac9c_fk_userprofile_user_id FOREIGN KEY (user_id) REFERENCES public.account_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: order_orderline order_orderline_order_id_eb04ec2d_fk_order_order_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.order_orderline
    ADD CONSTRAINT order_orderline_order_id_eb04ec2d_fk_order_order_id FOREIGN KEY (order_id) REFERENCES public.order_order(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: order_orderline order_orderline_variant_id_866774cb_fk_product_p; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.order_orderline
    ADD CONSTRAINT order_orderline_variant_id_866774cb_fk_product_p FOREIGN KEY (variant_id) REFERENCES public.product_productvariant(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: page_pagetranslation page_pagetranslation_page_id_60216ef5_fk_page_page_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.page_pagetranslation
    ADD CONSTRAINT page_pagetranslation_page_id_60216ef5_fk_page_page_id FOREIGN KEY (page_id) REFERENCES public.page_page(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: payment_payment payment_payment_checkout_id_1f32e1ab_fk_checkout_checkout_token; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.payment_payment
    ADD CONSTRAINT payment_payment_checkout_id_1f32e1ab_fk_checkout_checkout_token FOREIGN KEY (checkout_id) REFERENCES public.checkout_checkout(token) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: payment_payment payment_payment_order_id_22b45881_fk_order_order_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.payment_payment
    ADD CONSTRAINT payment_payment_order_id_22b45881_fk_order_order_id FOREIGN KEY (order_id) REFERENCES public.order_order(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: payment_transaction payment_transaction_payment_id_df9808d7_fk_payment_payment_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.payment_transaction
    ADD CONSTRAINT payment_transaction_payment_id_df9808d7_fk_payment_payment_id FOREIGN KEY (payment_id) REFERENCES public.payment_payment(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_assignedproductattribute_values product_assignedprod_assignedproductattri_6d497dfa_fk_product_a; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_assignedproductattribute_values
    ADD CONSTRAINT product_assignedprod_assignedproductattri_6d497dfa_fk_product_a FOREIGN KEY (assignedproductattribute_id) REFERENCES public.product_assignedproductattribute(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_assignedproductattribute product_assignedprod_assignment_id_eb2f81a4_fk_product_a; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_assignedproductattribute
    ADD CONSTRAINT product_assignedprod_assignment_id_eb2f81a4_fk_product_a FOREIGN KEY (assignment_id) REFERENCES public.product_attributeproduct(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_assignedproductattribute_values product_assignedprod_attributevalue_id_5bd29b24_fk_product_a; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_assignedproductattribute_values
    ADD CONSTRAINT product_assignedprod_attributevalue_id_5bd29b24_fk_product_a FOREIGN KEY (attributevalue_id) REFERENCES public.product_attributevalue(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_assignedproductattribute product_assignedprod_product_id_68be10a3_fk_product_p; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_assignedproductattribute
    ADD CONSTRAINT product_assignedprod_product_id_68be10a3_fk_product_p FOREIGN KEY (product_id) REFERENCES public.product_product(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_assignedvariantattribute_values product_assignedvari_assignedvariantattri_8d6d62ef_fk_product_a; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_assignedvariantattribute_values
    ADD CONSTRAINT product_assignedvari_assignedvariantattri_8d6d62ef_fk_product_a FOREIGN KEY (assignedvariantattribute_id) REFERENCES public.product_assignedvariantattribute(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_assignedvariantattribute product_assignedvari_assignment_id_8fdbffe8_fk_product_a; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_assignedvariantattribute
    ADD CONSTRAINT product_assignedvari_assignment_id_8fdbffe8_fk_product_a FOREIGN KEY (assignment_id) REFERENCES public.product_attributevariant(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_assignedvariantattribute_values product_assignedvari_attributevalue_id_41cc2454_fk_product_a; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_assignedvariantattribute_values
    ADD CONSTRAINT product_assignedvari_attributevalue_id_41cc2454_fk_product_a FOREIGN KEY (attributevalue_id) REFERENCES public.product_attributevalue(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_assignedvariantattribute product_assignedvari_variant_id_27483e6a_fk_product_p; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_assignedvariantattribute
    ADD CONSTRAINT product_assignedvari_variant_id_27483e6a_fk_product_p FOREIGN KEY (variant_id) REFERENCES public.product_productvariant(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_attributevalue product_attributecho_attribute_id_c28c6c92_fk_product_a; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_attributevalue
    ADD CONSTRAINT product_attributecho_attribute_id_c28c6c92_fk_product_a FOREIGN KEY (attribute_id) REFERENCES public.product_attribute(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_attributeproduct product_attributepro_attribute_id_0051c706_fk_product_a; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_attributeproduct
    ADD CONSTRAINT product_attributepro_attribute_id_0051c706_fk_product_a FOREIGN KEY (attribute_id) REFERENCES public.product_attribute(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_attributeproduct product_attributepro_product_type_id_54357b3b_fk_product_p; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_attributeproduct
    ADD CONSTRAINT product_attributepro_product_type_id_54357b3b_fk_product_p FOREIGN KEY (product_type_id) REFERENCES public.product_producttype(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_attributetranslation product_attributetra_attribute_id_238dabfc_fk_product_a; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_attributetranslation
    ADD CONSTRAINT product_attributetra_attribute_id_238dabfc_fk_product_a FOREIGN KEY (attribute_id) REFERENCES public.product_attribute(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_attributevaluetranslation product_attributeval_attribute_value_id_8b2cb275_fk_product_a; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_attributevaluetranslation
    ADD CONSTRAINT product_attributeval_attribute_value_id_8b2cb275_fk_product_a FOREIGN KEY (attribute_value_id) REFERENCES public.product_attributevalue(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_attributevariant product_attributevar_attribute_id_e47d3bc3_fk_product_a; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_attributevariant
    ADD CONSTRAINT product_attributevar_attribute_id_e47d3bc3_fk_product_a FOREIGN KEY (attribute_id) REFERENCES public.product_attribute(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_attributevariant product_attributevar_product_type_id_ba95c6dd_fk_product_p; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_attributevariant
    ADD CONSTRAINT product_attributevar_product_type_id_ba95c6dd_fk_product_p FOREIGN KEY (product_type_id) REFERENCES public.product_producttype(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_category product_category_parent_id_f6860923_fk_product_category_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_category
    ADD CONSTRAINT product_category_parent_id_f6860923_fk_product_category_id FOREIGN KEY (parent_id) REFERENCES public.product_category(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_categorytranslation product_categorytran_category_id_aa8d0917_fk_product_c; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_categorytranslation
    ADD CONSTRAINT product_categorytran_category_id_aa8d0917_fk_product_c FOREIGN KEY (category_id) REFERENCES public.product_category(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_collectionproduct product_collection_p_collection_id_0bc817dc_fk_product_c; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_collectionproduct
    ADD CONSTRAINT product_collection_p_collection_id_0bc817dc_fk_product_c FOREIGN KEY (collection_id) REFERENCES public.product_collection(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_collectionproduct product_collection_p_product_id_a45a5b06_fk_product_p; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_collectionproduct
    ADD CONSTRAINT product_collection_p_product_id_a45a5b06_fk_product_p FOREIGN KEY (product_id) REFERENCES public.product_product(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_collectiontranslation product_collectiontr_collection_id_cfbbd453_fk_product_c; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_collectiontranslation
    ADD CONSTRAINT product_collectiontr_collection_id_cfbbd453_fk_product_c FOREIGN KEY (collection_id) REFERENCES public.product_collection(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_digitalcontenturl product_digitalconte_content_id_654197bd_fk_product_d; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_digitalcontenturl
    ADD CONSTRAINT product_digitalconte_content_id_654197bd_fk_product_d FOREIGN KEY (content_id) REFERENCES public.product_digitalcontent(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_digitalcontenturl product_digitalconte_line_id_82056694_fk_order_ord; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_digitalcontenturl
    ADD CONSTRAINT product_digitalconte_line_id_82056694_fk_order_ord FOREIGN KEY (line_id) REFERENCES public.order_orderline(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_digitalcontent product_digitalconte_product_variant_id_211462a5_fk_product_p; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_digitalcontent
    ADD CONSTRAINT product_digitalconte_product_variant_id_211462a5_fk_product_p FOREIGN KEY (product_variant_id) REFERENCES public.product_productvariant(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_product product_product_category_id_0c725779_fk_product_category_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_product
    ADD CONSTRAINT product_product_category_id_0c725779_fk_product_category_id FOREIGN KEY (category_id) REFERENCES public.product_category(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_product product_product_default_variant_id_bce7dabb_fk_product_p; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_product
    ADD CONSTRAINT product_product_default_variant_id_bce7dabb_fk_product_p FOREIGN KEY (default_variant_id) REFERENCES public.product_productvariant(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_product product_product_product_type_id_4bfbbfda_fk_product_p; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_product
    ADD CONSTRAINT product_product_product_type_id_4bfbbfda_fk_product_p FOREIGN KEY (product_type_id) REFERENCES public.product_producttype(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_productimage product_productimage_product_id_544084bb_fk_product_product_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_productimage
    ADD CONSTRAINT product_productimage_product_id_544084bb_fk_product_product_id FOREIGN KEY (product_id) REFERENCES public.product_product(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_producttranslation product_producttrans_product_id_2c2c7532_fk_product_p; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_producttranslation
    ADD CONSTRAINT product_producttrans_product_id_2c2c7532_fk_product_p FOREIGN KEY (product_id) REFERENCES public.product_product(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_productvariant product_productvaria_product_id_43c5a310_fk_product_p; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_productvariant
    ADD CONSTRAINT product_productvaria_product_id_43c5a310_fk_product_p FOREIGN KEY (product_id) REFERENCES public.product_product(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_productvarianttranslation product_productvaria_product_variant_id_1b144a85_fk_product_p; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_productvarianttranslation
    ADD CONSTRAINT product_productvaria_product_variant_id_1b144a85_fk_product_p FOREIGN KEY (product_variant_id) REFERENCES public.product_productvariant(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_variantimage product_variantimage_image_id_bef14106_fk_product_p; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_variantimage
    ADD CONSTRAINT product_variantimage_image_id_bef14106_fk_product_p FOREIGN KEY (image_id) REFERENCES public.product_productimage(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_variantimage product_variantimage_variant_id_81123814_fk_product_p; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.product_variantimage
    ADD CONSTRAINT product_variantimage_variant_id_81123814_fk_product_p FOREIGN KEY (variant_id) REFERENCES public.product_productvariant(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: shipping_shippingmethodtranslation shipping_shippingmet_shipping_method_id_31d925d2_fk_shipping_; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.shipping_shippingmethodtranslation
    ADD CONSTRAINT shipping_shippingmet_shipping_method_id_31d925d2_fk_shipping_ FOREIGN KEY (shipping_method_id) REFERENCES public.shipping_shippingmethod(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: shipping_shippingmethod shipping_shippingmet_shipping_zone_id_265b7413_fk_shipping_; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.shipping_shippingmethod
    ADD CONSTRAINT shipping_shippingmet_shipping_zone_id_265b7413_fk_shipping_ FOREIGN KEY (shipping_zone_id) REFERENCES public.shipping_shippingzone(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: site_authorizationkey site_authorizationke_site_settings_id_d8397c0f_fk_site_site; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.site_authorizationkey
    ADD CONSTRAINT site_authorizationke_site_settings_id_d8397c0f_fk_site_site FOREIGN KEY (site_settings_id) REFERENCES public.site_sitesettings(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: site_sitesettings site_sitesettings_bottom_menu_id_e2a78098_fk_menu_menu_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.site_sitesettings
    ADD CONSTRAINT site_sitesettings_bottom_menu_id_e2a78098_fk_menu_menu_id FOREIGN KEY (bottom_menu_id) REFERENCES public.menu_menu(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: site_sitesettings site_sitesettings_company_address_id_f0825427_fk_account_a; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.site_sitesettings
    ADD CONSTRAINT site_sitesettings_company_address_id_f0825427_fk_account_a FOREIGN KEY (company_address_id) REFERENCES public.account_address(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: site_sitesettings site_sitesettings_homepage_collection__82f45d33_fk_product_c; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.site_sitesettings
    ADD CONSTRAINT site_sitesettings_homepage_collection__82f45d33_fk_product_c FOREIGN KEY (homepage_collection_id) REFERENCES public.product_collection(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: site_sitesettings site_sitesettings_site_id_64dd8ff8_fk_django_site_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.site_sitesettings
    ADD CONSTRAINT site_sitesettings_site_id_64dd8ff8_fk_django_site_id FOREIGN KEY (site_id) REFERENCES public.django_site(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: site_sitesettings site_sitesettings_top_menu_id_ab6f8c46_fk_menu_menu_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.site_sitesettings
    ADD CONSTRAINT site_sitesettings_top_menu_id_ab6f8c46_fk_menu_menu_id FOREIGN KEY (top_menu_id) REFERENCES public.menu_menu(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: site_sitesettingstranslation site_sitesettingstra_site_settings_id_ca085ff6_fk_site_site; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.site_sitesettingstranslation
    ADD CONSTRAINT site_sitesettingstra_site_settings_id_ca085ff6_fk_site_site FOREIGN KEY (site_settings_id) REFERENCES public.site_sitesettings(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: account_user userprofile_user_default_billing_addr_0489abf1_fk_userprofi; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_user
    ADD CONSTRAINT userprofile_user_default_billing_addr_0489abf1_fk_userprofi FOREIGN KEY (default_billing_address_id) REFERENCES public.account_address(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: account_user userprofile_user_default_shipping_add_aae7a203_fk_userprofi; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_user
    ADD CONSTRAINT userprofile_user_default_shipping_add_aae7a203_fk_userprofi FOREIGN KEY (default_shipping_address_id) REFERENCES public.account_address(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: account_user_groups userprofile_user_groups_group_id_c7eec74e_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_user_groups
    ADD CONSTRAINT userprofile_user_groups_group_id_c7eec74e_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: account_user_groups userprofile_user_groups_user_id_5e712a24_fk_userprofile_user_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_user_groups
    ADD CONSTRAINT userprofile_user_groups_user_id_5e712a24_fk_userprofile_user_id FOREIGN KEY (user_id) REFERENCES public.account_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: account_user_user_permissions userprofile_user_use_permission_id_1caa8a71_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_user_user_permissions
    ADD CONSTRAINT userprofile_user_use_permission_id_1caa8a71_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: account_user_user_permissions userprofile_user_use_user_id_6d654469_fk_userprofi; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.account_user_user_permissions
    ADD CONSTRAINT userprofile_user_use_user_id_6d654469_fk_userprofi FOREIGN KEY (user_id) REFERENCES public.account_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: warehouse_allocation warehouse_allocation_order_line_id_693dcb84_fk_order_ord; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.warehouse_allocation
    ADD CONSTRAINT warehouse_allocation_order_line_id_693dcb84_fk_order_ord FOREIGN KEY (order_line_id) REFERENCES public.order_orderline(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: warehouse_allocation warehouse_allocation_stock_id_73541542_fk_warehouse_stock_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.warehouse_allocation
    ADD CONSTRAINT warehouse_allocation_stock_id_73541542_fk_warehouse_stock_id FOREIGN KEY (stock_id) REFERENCES public.warehouse_stock(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: warehouse_stock warehouse_stock_product_variant_id_bea58a82_fk_product_p; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.warehouse_stock
    ADD CONSTRAINT warehouse_stock_product_variant_id_bea58a82_fk_product_p FOREIGN KEY (product_variant_id) REFERENCES public.product_productvariant(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: warehouse_stock warehouse_stock_warehouse_id_cc9d4e5d_fk_warehouse_warehouse_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.warehouse_stock
    ADD CONSTRAINT warehouse_stock_warehouse_id_cc9d4e5d_fk_warehouse_warehouse_id FOREIGN KEY (warehouse_id) REFERENCES public.warehouse_warehouse(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: warehouse_warehouse_shipping_zones warehouse_warehouse__shippingzone_id_aeee255b_fk_shipping_; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.warehouse_warehouse_shipping_zones
    ADD CONSTRAINT warehouse_warehouse__shippingzone_id_aeee255b_fk_shipping_ FOREIGN KEY (shippingzone_id) REFERENCES public.shipping_shippingzone(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: warehouse_warehouse_shipping_zones warehouse_warehouse__warehouse_id_fccd6647_fk_warehouse; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.warehouse_warehouse_shipping_zones
    ADD CONSTRAINT warehouse_warehouse__warehouse_id_fccd6647_fk_warehouse FOREIGN KEY (warehouse_id) REFERENCES public.warehouse_warehouse(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: warehouse_warehouse warehouse_warehouse_address_id_d46e1096_fk_account_address_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.warehouse_warehouse
    ADD CONSTRAINT warehouse_warehouse_address_id_d46e1096_fk_account_address_id FOREIGN KEY (address_id) REFERENCES public.account_address(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: webhook_webhook webhook_webhook_app_id_604d7610_fk_app_app_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.webhook_webhook
    ADD CONSTRAINT webhook_webhook_app_id_604d7610_fk_app_app_id FOREIGN KEY (app_id) REFERENCES public.app_app(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: webhook_webhookevent webhook_webhookevent_webhook_id_73b5c9e1_fk_webhook_webhook_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.webhook_webhookevent
    ADD CONSTRAINT webhook_webhookevent_webhook_id_73b5c9e1_fk_webhook_webhook_id FOREIGN KEY (webhook_id) REFERENCES public.webhook_webhook(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: wishlist_wishlist wishlist_wishlist_user_id_13f28b16_fk_account_user_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.wishlist_wishlist
    ADD CONSTRAINT wishlist_wishlist_user_id_13f28b16_fk_account_user_id FOREIGN KEY (user_id) REFERENCES public.account_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: wishlist_wishlistitem_variants wishlist_wishlistite_productvariant_id_819ee66b_fk_product_p; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.wishlist_wishlistitem_variants
    ADD CONSTRAINT wishlist_wishlistite_productvariant_id_819ee66b_fk_product_p FOREIGN KEY (productvariant_id) REFERENCES public.product_productvariant(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: wishlist_wishlistitem wishlist_wishlistite_wishlist_id_a052b63d_fk_wishlist_; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.wishlist_wishlistitem
    ADD CONSTRAINT wishlist_wishlistite_wishlist_id_a052b63d_fk_wishlist_ FOREIGN KEY (wishlist_id) REFERENCES public.wishlist_wishlist(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: wishlist_wishlistitem_variants wishlist_wishlistite_wishlistitem_id_ee616761_fk_wishlist_; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.wishlist_wishlistitem_variants
    ADD CONSTRAINT wishlist_wishlistite_wishlistitem_id_ee616761_fk_wishlist_ FOREIGN KEY (wishlistitem_id) REFERENCES public.wishlist_wishlistitem(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: wishlist_wishlistitem wishlist_wishlistitem_product_id_8309716a_fk_product_product_id; Type: FK CONSTRAINT; Schema: public; Owner: saleor
--

ALTER TABLE ONLY public.wishlist_wishlistitem
    ADD CONSTRAINT wishlist_wishlistitem_product_id_8309716a_fk_product_product_id FOREIGN KEY (product_id) REFERENCES public.product_product(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

