-- Allow public read access to vendors (marketplace needs to display seller info)
CREATE POLICY "vendors_read_public" ON public.vendors FOR SELECT USING (true);

-- Allow public read access to item_images
ALTER TABLE public.item_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "item_images_read_public" ON public.item_images FOR SELECT USING (true);

-- Allow public read access to franchises
ALTER TABLE public.franchises ENABLE ROW LEVEL SECURITY;
CREATE POLICY "franchises_read_public" ON public.franchises FOR SELECT USING (true);

-- Allow public read access to categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "categories_read_public" ON public.categories FOR SELECT USING (true);
