import styles from './styles.module.css';

export default function IntroPage(){
  return(
    <>
      <main className={styles.main}>
        <h1 className={styles.h1}>환영합니다!</h1>
        <section className={styles.section}>
          <article className={styles.article}>당신의 자아를 탐색하는 공간, 후아미입니다.</article>
          <article className={styles.article}>후아미는 Who am I? 라는 질문에서 착안한 이름으로, 나 자신을 돌아볼 수 있는 곳입니다.</article>
          <article className={styles.article}>성격 검사를 통해 당신이 누구인지, 어떤 성향을 가지고 있는지를 알아가는 과정을 제공합니다.</article>
          <article className={styles.article}>이 과정을 통해 당신은 자신에 대해 더 깊이 이해하고, 자신의 강점과 약점, 성향 등을 알아낼 수 있게 될 것입니다.</article>
          <article className={styles.article}>후아미는 자신과 비슷한, 그리고 다른 성향을 가진 사람들과 소통하고 공유하는 커뮤니티 공간도 제공합니다.</article>
          <article className={styles.article}>자신을 찾는 여정은 때로는 힘들고 혼란스러울 수 있습니다. 그러나 그 과정을 우리가, 그리고 다른 사람들이 함께할 것입니다.</article>
          <article className={styles.article}>당신의 내면 여행이 여기서 시작되기를 기대합니다.</article>
        </section>
      </main>
    </>
  );
}