/*
          # Create Orders and Points Transaction System
          [This migration sets up the core tables and logic for handling product orders and awarding loyalty points upon purchase. It creates an `orders` table to store purchase details and a `points_transactions` table to log all point movements for a complete user history.]

          ## Query Description: [This operation is structural and safe. It adds new tables and a function without altering or deleting existing data. No backup is required as it only extends the current schema.]
          
          ## Metadata:
          - Schema-Category: ["Structural"]
          - Impact-Level: ["Low"]
          - Requires-Backup: [false]
          - Reversible: [true]
          
          ## Structure Details:
          - Tables Added: `public.orders`, `public.points_transactions`
          - Functions Added: `public.create_order_and_award_points`
          - Tables Modified: None
          
          ## Security Implications:
          - RLS Status: [Enabled]
          - Policy Changes: [Yes] - New policies are created for the new tables to ensure users can only access their own data.
          - Auth Requirements: [User authentication is required to create orders and view transactions.]
          
          ## Performance Impact:
          - Indexes: [Added] - Indexes are created on foreign keys (`user_id`, `order_id`) for efficient querying.
          - Triggers: [None]
          - Estimated Impact: [Low. The new tables and function are optimized for performance and will not impact existing operations.]
          */

-- 1. Create the 'orders' table
CREATE TABLE public.orders (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    total_amount numeric(10, 2) NOT NULL,
    status text NOT NULL DEFAULT 'completed'::text,
    points_earned integer NOT NULL DEFAULT 0,
    CONSTRAINT orders_pkey PRIMARY KEY (id),
    CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 2. Create the 'points_transactions' table
CREATE TABLE public.points_transactions (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    type text NOT NULL,
    points_change integer NOT NULL,
    description text,
    order_id uuid,
    CONSTRAINT points_transactions_pkey PRIMARY KEY (id),
    CONSTRAINT points_transactions_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE SET NULL,
    CONSTRAINT points_transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE public.points_transactions ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS policies for the new tables
CREATE POLICY "Users can view their own orders" ON public.orders
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders" ON public.orders
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own points transactions" ON public.points_transactions
    FOR SELECT USING (auth.uid() = user_id);

-- 4. Create indexes for performance
CREATE INDEX ix_orders_user_id ON public.orders(user_id);
CREATE INDEX ix_points_transactions_user_id ON public.points_transactions(user_id);

-- 5. Create the database function to handle order creation and point awarding
CREATE OR REPLACE FUNCTION public.create_order_and_award_points(total_amount_param numeric)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    points_to_award int;
    new_order_id uuid;
    current_user_id uuid := auth.uid();
BEGIN
    -- Rule: 1 point for every $1 spent
    points_to_award := floor(total_amount_param);

    -- Insert the new order
    INSERT INTO public.orders (user_id, total_amount, points_earned)
    VALUES (current_user_id, total_amount_param, points_to_award)
    RETURNING id INTO new_order_id;

    -- Update the user's loyalty points in the profiles table
    UPDATE public.profiles
    SET loyalty_points = loyalty_points + points_to_award
    WHERE id = current_user_id;

    -- Log the transaction
    INSERT INTO public.points_transactions (user_id, type, points_change, description, order_id)
    VALUES (current_user_id, 'purchase', points_to_award, 'Earned from order ' || new_order_id::text, new_order_id);

    RETURN json_build_object('success', true, 'order_id', new_order_id, 'points_awarded', points_to_award);
END;
$$;
</sql>
