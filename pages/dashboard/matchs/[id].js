import { useRouter } from 'next/router';
import { supabase } from '../../../api/supabase';
import { Icon } from '@iconify/react';
export default function Matchs({matchDat}) {
    return(
        <div classNmae="backgrounds">
<Stack>
            <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
        <Icon icon="basil:cancel-outline" width={24} height={24} onClick={() => {}}/>
                </Stack>
</Stack>
        </div>
    )
}
export async function getStaticPaths() {
    const { data, error } = await supabase
        .from('bets')
        .select()
    const paths = data.map((ref) => ({
        params: { id: ref.match_id },
    }))



    return { paths, fallback: true }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const { data, error } = await supabase
        .from('bets')
        .select()
        .eq('match_id', params.id)
    let matchDat = data;

    // Pass post data to the page via props
    return { props: { matchDat } }
}